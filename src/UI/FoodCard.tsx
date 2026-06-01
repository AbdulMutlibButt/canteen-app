"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FoodCard({ image, tag, rating, title, subtitle, price, originalPrice, discount, isCombo }: { image: string; tag: string; rating?: number; title: string; subtitle?: string; price: string; originalPrice?: string; discount?: string; isCombo: boolean }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group"
        >
            {/* Image Container */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-50">
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Absolute Badges */}
                {discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                        {discount} OFF
                    </div>
                )}

                {rating && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="text-amber-500">★</span> {rating}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                {tag && <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-1">{tag}</span>}
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-orange-600 transition-colors">{title}</h3>
                {subtitle && <p className="text-sm text-slate-500 mt-1 line-clamp-2 min-h-[40px]">{subtitle}</p>}

                {/* Pricing and Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-slate-900">₹{price}</span>
                        {originalPrice && (
                            <span className="text-xs line-through text-slate-400 font-medium">₹{originalPrice}</span>
                        )}
                    </div>

                    <button className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm ${isCombo
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white w-full text-center'
                        : 'bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white border border-orange-100'
                        }`}>
                        {isCombo ? 'Grab Deal' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}