"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FoodCard from "@/src/UI/FoodCard";

const categories = ["All", "Burger", "Pizza", "Biryani", "Fast Food", "Drinks", "Snacks"];
const menuItems = [
    { id: 1, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500", tag: "Burger", rating: 4.8, title: "Classic Beef Burger", subtitle: "Juicy beef patty with fresh vegetables", price: 299 },
    { id: 2, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500", tag: "Burger", rating: 4.9, title: "Double Cheese Burger", subtitle: "Two beef patties with extra cheese", price: 399 },
    { id: 3, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500", tag: "Burger", rating: 4.7, title: "Chicken Burger", subtitle: "Crispy chicken with special sauce", price: 249 },
    { id: 4, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500", tag: "Pizza", rating: 4.9, title: "Supreme Pizza", subtitle: "Loaded with pepperoni, olives, and bell peppers", price: 449 },
    { id: 5, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=500", tag: "Pizza", rating: 4.8, title: "Cheese Burst Pizza", subtitle: "Overflowing gooey cheese mozzarella blend", price: 499 },
    { id: 6, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500", tag: "Pizza", rating: 4.6, title: "Thin Crust Veggie", subtitle: "Crisp crust with seasonal garden vegetables", price: 349 },
    { id: 7, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500", tag: "Biryani", rating: 4.8, title: "Hyderabadi Biryani", subtitle: "Fragrant long-grain basmati rice with spices", price: 279 },
    { id: 8, image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=500", tag: "Drinks", rating: 4.5, title: "Mango Smoothie", subtitle: "Fresh blended tropical sweet mangoes", price: 129 },
];
export default function MenuPage() {
    // State management for working filters
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [maxPrice, setMaxPrice] = useState(500);

    // Filter computation logic
    const filteredItems = useMemo(() => {
        return menuItems.filter((item) => {
            const matchesCategory = selectedCategory === "All" || item.tag === selectedCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = item.price <= maxPrice;

            return matchesCategory && matchesSearch && matchesPrice;
        });
    }, [selectedCategory, searchQuery, maxPrice]);

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col font-sans">


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
                {/* Title Area */}
                <div className="mb-10 text-left">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Our Menu</h1>
                    <p className="text-slate-500 text-sm mt-1">Discover delicious meals crafted just for you</p>
                </div>

                {/* Layout Grid Split (Sidebar Filters + Main Products) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Side Filter Control Box */}
                    <aside className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
                        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                            <span className="text-orange-600 text-lg">⏳</span>
                            <h2 className="font-bold text-slate-900 text-base">Filters</h2>
                        </div>

                        {/* Search Filter Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Search</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search menu..."
                                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Dynamic Price Range Slider */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price Range</label>
                                <span className="text-sm font-bold text-slate-700">Rs 0 -Rs. {maxPrice}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="500"
                                step="10"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
                            />
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 px-0.5">
                                <span>Rs 0</span>
                                <span>Rs 250</span>
                                <span>Rs 500</span>
                            </div>
                        </div>
                    </aside>

                    {/* Right Column: Dynamic Content & Categorization */}
                    <section className="lg:col-span-9 space-y-8">
                        {/* Horizontal Category Tab Bar Selector */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none mask-image">
                            {categories.map((category) => {
                                const isActive = selectedCategory === category;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-5 py-2 rounded-xl text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 ${isActive
                                            ? "bg-orange-600 text-white shadow-md shadow-orange-600/10 scale-102"
                                            : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/60 hover:border-slate-300"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Product Card Flex Grid Display */}
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredItems.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FoodCard {...item} isCombo={false} price={item.price.toString()} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Fallback Empty Search/Filter State */}
                        {filteredItems.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl"
                            >
                                <span className="text-4xl">🍽️</span>
                                <h3 className="font-bold text-slate-800 mt-4 text-base">No meals match your criteria</h3>
                                <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">Try typing something else or loosening your filter configurations.</p>
                                <button
                                    onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setMaxPrice(500); }}
                                    className="mt-5 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 px-4 py-2 rounded-xl hover:bg-orange-600 hover:text-white transition-all"
                                >
                                    Clear All Filters
                                </button>
                            </motion.div>
                        )}
                    </section>

                </div>
            </main>


        </div>
    );
}