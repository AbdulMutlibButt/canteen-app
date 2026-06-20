
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, collection, addDoc, onSnapshot } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAouGVVUkNI5OBJgumig4-kcFeEhV7_S20",
  authDomain: "food-delivery-a4138.firebaseapp.com",
  projectId: "food-delivery-a4138",
  storageBucket: "food-delivery-a4138.firebasestorage.app",
  messagingSenderId: "1074203409046",
  appId: "1:1074203409046:web:2c3e69becc7fb58f1a60b7",
  measurementId: "G-1QBHPRF2LD"
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