"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "AI Assistant", href: "/ai-assistant" },
    { name: "Deals", href: "/deals" },
    { name: "Contact Us", href: "/contact" },
];

export default function Header() {
    const pathname = usePathname();

    return (
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
                                className={`text-sm font-semibold transition-colors relative py-2 ${
                                    isActive ? "text-orange-600" : "text-slate-600 hover:text-slate-900"
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
                    <button className="p-2.5 hover:bg-slate-50 rounded-xl transition text-slate-600 relative">
                        🛒
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-600 rounded-full" />
                    </button>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-md shadow-orange-600/10 text-sm">
                        Login
                    </button>
                </div>
            </div>
        </header>
    );
}