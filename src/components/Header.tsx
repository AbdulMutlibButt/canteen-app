"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, logoutUser } from "../../config/firebase";
import { useCart } from "../context/CartContext";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "AI Assistant", href: "/ai-assistant" },
    { name: "Deals", href: "/deals" },
    { name: "Contact Us", href: "/contact" },
];

export default function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const { totalItems } = useCart();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);



    return (
        <>
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
                            <span className="text-white font-black text-lg">✨</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-slate-900 text-lg tracking-tight leading-none">AI Smart Canteen</span>
                            <span className="text-[10px] text-slate-400 font-medium mt-0.5">Powered by AI</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8 ">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-sm font-semibold transition-colors relative py-2 ${isActive ? "text-orange-600" : "text-slate-600 hover:text-slate-900"
                                        } cursor-pointer`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link href="/cart" className="p-2.5 hover:bg-slate-50 rounded-xl transition text-slate-600 relative cursor-pointer">
                            🛒
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <div className="hidden md:flex items-center gap-4">
                                <span className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">
                                    {user.displayName || user.email?.split("@")[0] || "User"}
                                </span>
                                <button onClick={handleLogout} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl transition shadow-sm text-sm cursor-pointer">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="hidden md:block bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-md shadow-orange-600/10 text-sm cursor-pointer">
                                Login
                            </Link>
                        )}

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2.5 hover:bg-slate-50 rounded-xl transition text-slate-600 cursor-pointer"
                            aria-label="Open menu"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs md:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[320px] bg-white shadow-2xl flex flex-col md:hidden"
                        >
                            {/* Drawer Header */}
                            <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center shadow-md shadow-orange-500/20">
                                        <span className="text-white font-black text-sm">✨</span>
                                    </div>
                                    <span className="font-black text-slate-900 text-base tracking-tight">AI Smart Canteen</span>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2.5 hover:bg-slate-50 rounded-xl transition text-slate-600 cursor-pointer"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Drawer Navigation Links */}
                            <nav className="flex-1 px-6 py-8 flex flex-col gap-1 overflow-y-auto">
                                {navItems.map((item, idx) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 + 0.1, duration: 0.2 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all relative ${isActive
                                                        ? "text-orange-600 bg-orange-50/50"
                                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                                    }`}
                                            >
                                                {item.name}
                                                {isActive && (
                                                    <span className="absolute left-0 top-3 bottom-3 w-1 bg-orange-600 rounded-full" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            {/* Drawer Footer Actions */}
                            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                                <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-medium">
                                    <span>Need assistance?</span>
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-orange-600 hover:underline"
                                    >
                                        Support
                                    </Link>
                                </div>
                                {user ? (
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-center bg-slate-100 py-2 rounded-xl text-sm font-semibold text-slate-700">
                                            Hello, {user.displayName || user.email?.split("@")[0] || "User"}
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 rounded-xl transition shadow-sm text-sm cursor-pointer text-center block"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition shadow-md shadow-orange-600/10 text-sm cursor-pointer text-center block"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}