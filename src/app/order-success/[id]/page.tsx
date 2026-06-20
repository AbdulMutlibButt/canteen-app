"use client";

import { use, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { fetchOrder } from "@/config/firebase";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OrderSuccessPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const orderId = params.id;
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Trigger green confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#22c55e', '#16a34a', '#15803d', '#ffffff'] // Various greens and white
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#22c55e', '#16a34a', '#15803d', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();

        const loadOrder = async () => {
            try {
                const orderData = await fetchOrder(orderId);
                if (orderData) {
                    setOrder(orderData);
                }
            } catch (error) {
                console.error("Failed to fetch order", error);
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, [orderId]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#FDFBF7] p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white max-w-lg w-full rounded-3xl p-8 sm:p-10 text-center shadow-xl shadow-green-900/5 border border-green-100 relative overflow-hidden"
            >
                {/* Decorative background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-green-50 to-transparent -z-10" />

                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-sm border border-green-200">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-black text-slate-900 mb-2">Order Confirmed!</h1>
                <p className="text-slate-500 mb-8">Thank you for your purchase. Your food is being prepared.</p>

                <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8 border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Order ID</p>
                    <p className="font-mono text-slate-900 font-bold mb-4">{orderId.toUpperCase()}</p>

                    {loading ? (
                        <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ) : order ? (
                        <>
                            <div className="border-t border-slate-200 pt-4 mb-4">
                                <h3 className="text-sm font-bold text-slate-700 mb-3">Order Details</h3>
                                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                    {order.items.map((item: any, index: number) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="text-slate-600">{item.quantity}x {item.title}</span>
                                            <span className="font-medium text-slate-900">Rs{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                                <span className="font-bold text-slate-900">Total Paid</span>
                                <span className="text-xl font-black text-green-600">Rs{order.total}</span>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-red-500">Could not load order details.</p>
                    )}
                </div>

                <Link
                    href="/menu"
                    className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-slate-900/20"
                >
                    Back to Menu
                </Link>
            </motion.div>
        </div>
    );
}
