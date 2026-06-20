"use client";

import { useCart } from "@/src/context/CartContext";
import { menuItems } from "@/src/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, createOrder } from "@/config/firebase";

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, totalItems, clearCart } = useCart();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const cartProducts = cartItems.map(cartItem => {
        const product = menuItems.find(item => item.id === cartItem.productId);
        return {
            ...product,
            quantity: cartItem.quantity
        };
    }).filter(item => item.id !== undefined);

    const subtotal = cartProducts.reduce((acc, item) => acc + (item.price! * item.quantity), 0);
    const deliveryFee = subtotal > 500 ? 0 : 30;
    const total = subtotal + deliveryFee;

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            const userId = auth.currentUser?.uid || "anonymous";

            // Save order to Firebase
            const orderId = await createOrder(
                userId,
                cartProducts.map(p => ({ productId: p.id, title: p.title, price: p.price, quantity: p.quantity })),
                subtotal,
                deliveryFee,
                total
            );

            clearCart();
            // Redirect to success page
            router.push(`/order-success/${orderId}`);
        } catch (error) {
            console.error("Error saving order: ", error);
            alert("Something went wrong. Please try again.");
            setIsCheckingOut(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center max-w-md w-full"
                >
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                    <p className="text-slate-500 text-center mb-8">Add some delicious items to get started!</p>
                    <Link
                        href="/menu"
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl transition shadow-md shadow-orange-600/20"
                    >
                        Browse Menu &rarr;
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
                    <p className="text-slate-500 mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="lg:w-2/3 space-y-4">
                        <AnimatePresence>
                            {cartProducts.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-center"
                                >
                                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-50">
                                        <Image
                                            src={item.image!}
                                            alt={item.title!}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-grow flex flex-col justify-between h-full py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg leading-tight">{item.title}</h3>
                                                <span className="text-orange-600 font-bold mt-1 block">Rs{item.price}</span>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id!)}
                                                className="text-red-400 hover:text-red-500 p-1 transition"
                                                aria-label="Remove item"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-slate-900 transition"
                                                >
                                                    -
                                                </button>
                                                <span className="font-bold w-4 text-center text-slate-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 transition"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="font-black text-slate-900">
                                                Rs{item.price! * item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal</span>
                                    <span className="text-slate-900">Rs{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Delivery Fee</span>
                                    <span className="text-slate-900">{deliveryFee === 0 ? 'Free' : `Rs${deliveryFee}`}</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-slate-900 text-lg">Total</span>
                                    <span className="font-black text-orange-600 text-2xl">Rs{total}</span>
                                </div>
                            </div>



                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-orange-600/20 mb-3"
                            >
                                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                            </button>

                            <Link
                                href="/menu"
                                className="block w-full text-center text-orange-600 font-semibold py-2 hover:bg-orange-50 rounded-xl transition"
                            >
                                Continue Shopping
                            </Link>

                            <div className="mt-6 flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                                <div className="mt-0.5 shrink-0 bg-green-100 p-1 rounded-full text-green-600">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Free delivery on orders above Rs500</p>
                                    <p className="text-xs text-slate-500 mt-0.5">Estimated delivery: 20-30 mins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
