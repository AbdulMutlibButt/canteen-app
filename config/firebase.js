
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, collection, addDoc, onSnapshot } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics can sometimes fail if blocked by adblockers or run on server
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// ----------------------------------------------------
// Backend Logic: Single Source of Truth
// ----------------------------------------------------

const ensureUserInDb = async (user, name = "User") => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      name: user.displayName || name,
      createdAt: serverTimestamp(),
    });
  }
};

export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserInDb(userCredential.user);
  return userCredential;
};

export const signUpWithEmail = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  await ensureUserInDb(userCredential.user, name);
  return userCredential;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  await ensureUserInDb(userCredential.user);
  return userCredential;
};

export const logoutUser = async () => {
  return signOut(auth);
};

// ----------------------------------------------------
// Cart and Order Logic
// ----------------------------------------------------

export const saveCartToDb = async (userId, cartItems) => {
  const cartRef = doc(db, "carts", userId);
  await setDoc(cartRef, { items: cartItems }, { merge: true });
};

export const subscribeToCart = (userId, callback) => {
  const cartRef = doc(db, "carts", userId);
  return onSnapshot(cartRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().items || []);
    } else {
      callback(null); // Document doesn't exist
    }
  });
};

export const createOrder = async (userId, items, subtotal, deliveryFee, total) => {
  const orderRef = await addDoc(collection(db, "orders"), {
    userId,
    items,
    subtotal,
    deliveryFee,
    total,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return orderRef.id;
};

export const fetchOrder = async (orderId) => {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

export { app, auth, db, analytics };