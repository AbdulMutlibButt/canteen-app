"use client";
import { motion } from "framer-motion";

export default function SectionHeading({ badgeText, title, subtitle, viewAllLink }: { badgeText: string; title: string; subtitle?: string; viewAllLink?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
            <div>
                {badgeText && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-100 rounded-full mb-3 shadow-sm">
                        {badgeText.includes('⚡') ? '' : '✨'} {badgeText}
                    </span>
                )}
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
                {subtitle && <p className="text-sm text-slate-500 mt-2">{subtitle}</p>}
            </div>

            {viewAllLink && (
                <a href={viewAllLink} className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition flex items-center justify-center gap-1 group">
                    View All <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
            )}
        </motion.div>
    );
}