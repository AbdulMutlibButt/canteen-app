"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import SectionHeading from "@/src/UI/SectionHeading";
import FoodCard from "@/src/UI/FoodCard";
import Link from "next/link";

// Mock Data Source
const featuredFoods = [
  { id: 1, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500", tag: "Burger", rating: 4.8, title: "Classic Beef Burger", price: "299" },
  { id: 2, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500", tag: "Pizza", rating: 4.9, title: "Margherita Pizza", price: "339" },
  { id: 3, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500", tag: "Biryani", rating: 4.7, title: "Chicken Biryani", price: "249" },
  { id: 4, image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=500", tag: "Drinks", rating: 4.6, title: "Fresh Smoothie", price: "149" },
];

const studentCombos = [
  { id: 1, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500", discount: "30%", title: "Student Combo", subtitle: "Burger + Fries + Drink", price: "349", originalPrice: "499" },
  { id: 2, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=500", discount: "25%", title: "Pizza Party", subtitle: "2 Medium Pizzas", price: "599", originalPrice: "798" },
  { id: 3, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=500", discount: "33%", title: "Biryani Special", subtitle: "Biryani + Raita + Dessert", price: "299", originalPrice: "449" },
];

const testimonials = [
  { name: "Priya Sharma", role: "CS Student", text: "The AI recommendations are spot on! It always suggests meals within my budget." },
  { name: "Rahul Kumar", role: "Engineering Student", text: "Super convenient! I can order between classes without any hassle." },
  { name: "Ananya Patel", role: "MBA Student", text: "Love the student discounts and combo deals. Saves me so much money!" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col font-sans selection:bg-orange-200">


      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-500 text-white relative overflow-hidden py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Hero Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide border border-white/20">
              🤖 AI-Powered Recommendations
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Smart Food Ordering <br />
              <span className="text-amber-300">with AI Recommendations</span>
            </h1>
            <p className="text-orange-50 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium opacity-90">
              Get personalized meal suggestions powered by AI. Order your favorite campus meals in seconds!
            </p>

            {/* Search Container */}
            <div className="bg-white p-2 rounded-2xl shadow-xl max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row items-center gap-2 mt-8">
              <input
                type="text"
                placeholder="Search for food..."
                className="w-full px-4 py-3 text-slate-800 focus:outline-none placeholder-slate-400 font-medium text-sm"
              />
              <div className="flex w-full sm:w-auto gap-2">
                <Link href="/menu" className="whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold transition text-sm w-full sm:w-auto">
                  Order Now →
                </Link>
                <Link href="/ai-assistant" className="whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-1 w-full sm:w-auto">
                  🤖 Ask Assistant
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Hero Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[400px] aspect-square rounded-[2.5rem] overflow-hidden border-8 border-white/10 shadow-2xl bg-orange-700/50">
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600"
                alt="Featured Hero Food"
                className="w-full h-full object-cover object-center"
                width={400}
                height={400}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Foods Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          badgeText="Campus Favorites"
          title="Featured Foods"
          subtitle="Most popular items on campus"
          viewAllLink="/menu"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFoods.map((food) => (
            <FoodCard key={food.id} {...food} isCombo={false} />
          ))}
        </div>
      </section>

      {/* Student Combos Section */}
      <section className="bg-orange-50/60 border-y border-orange-100/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badgeText="⚡ Limited Time Offers"
            title="Student Combo Offers"
            subtitle="Save big with our exclusive student deals"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentCombos.map((combo) => (
              <FoodCard key={combo.id} {...combo} isCombo={true} tag="" />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">What Students Say</h2>
          <p className="text-slate-500 text-sm mt-2">Trusted by thousands of campus students</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
            >
              <p className="text-slate-600 text-sm leading-relaxed italic mb-6">{t.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">{t.name}</h4>
                  <span className="text-xs text-slate-400 font-medium">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating AI Bubble Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group relative">
          🤖
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse" />
        </button>
      </div>
    </div>
  );
}