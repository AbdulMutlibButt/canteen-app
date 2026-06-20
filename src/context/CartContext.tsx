"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, saveCartToDb, subscribeToCart } from "../../config/firebase";

export type CartItem = {
    productId: number;
    quantity: number;
};

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Track authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                // Load from local storage if not logged in
                const localCart = localStorage.getItem("cart");
                if (localCart) {
                    try {
                        setCartItems(JSON.parse(localCart));
                    } catch (e) {
                        console.error("Failed to parse local cart", e);
                    }
                }
                setIsLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    // Sync with Firebase when logged in
    useEffect(() => {
        if (!user) return;

        const unsubscribe = subscribeToCart(user.uid, (items: CartItem[] | null) => {
            if (items) {
                setCartItems(items);
            } else {
                // If doc doesn't exist, maybe merge local cart into firebase
                if (cartItems.length > 0) {
                     saveCartToDb(user.uid, cartItems);
                }
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    // Save to local storage or Firebase when cart changes
    const saveCart = async (newCart: CartItem[]) => {
        setCartItems(newCart);
        if (user) {
            try {
                await saveCartToDb(user.uid, newCart);
            } catch (error) {
                console.error("Failed to save cart to Firebase", error);
            }
        } else {
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
    };

    const addToCart = (productId: number) => {
        const existingItem = cartItems.find((item) => item.productId === productId);
        if (existingItem) {
            const newCart = cartItems.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
            saveCart(newCart);
        } else {
            saveCart([...cartItems, { productId, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId: number) => {
        const newCart = cartItems.filter((item) => item.productId !== productId);
        saveCart(newCart);
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        const newCart = cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
        );
        saveCart(newCart);
    };

    const clearCart = () => {
        saveCart([]);
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
