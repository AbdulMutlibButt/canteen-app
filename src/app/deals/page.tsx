"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Mock data for Today's Best Deals
const todayDeals = [
  {
    id: "student-mega-combo",
    title: "Student Mega Combo",
    subtitle: "Burger + Fries + Drink + Dessert",
    price: 349,
    originalPrice: 549,
    discount: "36% OFF",
    tag: "BESTSELLER",
    tagStyle: "bg-amber-100/90 text-amber-800 border border-amber-200/80 backdrop-blur-xs",
    timeLeft: "2 hours left",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500"
  },
  {
    id: "pizza-party-deal",
    title: "Pizza Party Deal",
    subtitle: "2 Medium Pizzas + 2 Drinks",
    price: 599,
    originalPrice: 898,
    discount: "33% OFF",
    tag: "LIMITED",
    tagStyle: "bg-slate-900/90 text-slate-100 border border-slate-800 backdrop-blur-xs",
    timeLeft: "Today only",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500"
  },
  {
    id: "biryani-special",
    title: "Biryani Special",
    subtitle: "Biryani + Raita + Salad + Dessert",
    price: 299,
    originalPrice: 499,
    discount: "40% OFF",
    tag: "HOT DEAL",
    tagStyle: "bg-rose-100/90 text-rose-800 border border-rose-200/80 backdrop-blur-xs",
    timeLeft: "5 hours left",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=500"
  },
  {
    id: "breakfast-bundle",
    title: "Breakfast Bundle",
    subtitle: "Sandwich + Coffee + Juice",
    price: 199,
    originalPrice: 299,
    discount: "33% OFF",
    tag: "MORNING",
    tagStyle: "bg-yellow-100/90 text-yellow-800 border border-yellow-200/80 backdrop-blur-xs",
    timeLeft: "Until 11 AM",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500"
  },
  {
    id: "healthy-meal",
    title: "Healthy Meal",
    subtitle: "Salad Bowl + Smoothie + Nuts",
    price: 249,
    originalPrice: 399,
    discount: "38% OFF",
    tag: "HEALTHY",
    tagStyle: "bg-emerald-100/90 text-emerald-800 border border-emerald-200/80 backdrop-blur-xs",
    timeLeft: "3 hours left",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500"
  },
  {
    id: "late-night-snack",
    title: "Late Night Snack",
    subtitle: "Wings + Fries + Cola",
    price: 279,
    originalPrice: 429,
    discount: "35% OFF",
    tag: "EVENING",
    tagStyle: "bg-indigo-100/90 text-indigo-800 border border-indigo-200/80 backdrop-blur-xs",
    timeLeft: "After 6 PM",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=500"
  }
];

export default function DealsPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyEmail.includes("@") && verifyEmail.includes(".edu") || verifyEmail.length > 5) {
      setIsVerified(true);
      setShowVerifyModal(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] text-slate-800 flex flex-col font-sans selection:bg-orange-200 flex-grow">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full space-y-16">

        {/* Hero Banner Section */}
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white p-8 sm:p-12 shadow-xl shadow-orange-600/10">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
          <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-black/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase border border-white/20">
              📈 Limited Time Offers
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none">
              Amazing Deals & Offers
            </h1>
            <p className="text-orange-50 text-sm sm:text-lg font-medium opacity-90 max-w-xl">
              Save up to 40% on your favorite meals. Exclusive student discounts available!
            </p>
          </div>
        </section>

        {/* Today's Best Deals Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Today's Best Deals</h2>
            <p className="text-slate-500 text-sm mt-1">Grab them before they're gone!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {todayDeals.map((deal, idx) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group"
              >
                {/* Image overlay container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-50">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-md">
                    {deal.discount}
                  </div>

                  {/* Bestseller / Limited Tag */}
                  <div className={`absolute top-4 right-4 text-[10px] font-black tracking-wider px-3 py-1.5 rounded-xl shadow-xs uppercase ${deal.tagStyle}`}>
                    {deal.tag}
                  </div>

                  {/* Time Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/70 backdrop-blur-md text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center gap-2 border border-white/10 shadow-lg">
                    <span className="text-base leading-none">⏱️</span>
                    <span>{deal.timeLeft}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-800 text-xl group-hover:text-orange-600 transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium line-clamp-1">{deal.subtitle}</p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-100" />

                  {/* Price and Redirect Action */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-950">Rs. {deal.price}</span>
                      <span className="text-sm line-through text-slate-400 font-bold">Rs. {deal.originalPrice}</span>
                    </div>

                    <Link href="/menu" className="block">
                      <span className="inline-flex bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-5 py-2.5 rounded-xl transition text-sm shadow-md shadow-orange-600/10 cursor-pointer">
                        Grab This Deal
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Recommended Deals Section */}
        <section className="space-y-6">
          {/* Sparkles Header Bar */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg shadow-indigo-600/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-lg">
                ✨
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight flex items-center gap-2">AI Recommended Deals</h3>
                <p className="text-indigo-100 text-xs sm:text-sm font-medium opacity-90 mt-0.5">
                  Based on your preferences and budget, our AI picked these exclusive deals just for you!
                </p>
              </div>
            </div>
          </div>

          {/* AI Recommended Deals Grid (2 horizontal cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Deal 1: Budget Saver */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row h-full"
            >
              <div className="relative w-full sm:w-2/5 min-h-[160px] sm:min-h-full bg-slate-50">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500"
                  alt="AI Recommended Budget Saver"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 text-[10px] font-bold text-violet-700 uppercase tracking-wide">
                    ✨ AI Recommended
                  </span>
                  <h4 className="font-black text-slate-800 text-lg">AI Picked: Budget Saver</h4>
                  <p className="text-xs text-slate-500 font-medium">Best value for money combo</p>
                </div>
                <div className="flex items-center justify-between gap-2 pt-2">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900">Rs. 199</span>
                      <span className="text-xs line-through text-slate-400 font-bold">Rs. 349</span>
                    </div>
                    <span className="inline-block self-start mt-1 bg-emerald-50 text-[10px] font-bold text-emerald-700 px-2 py-0.5 rounded-md">
                      Save 43%
                    </span>
                  </div>
                  <Link href="/ai-assistant?prompt=Apply the AI Picked Budget Saver deal for Rs. 199">
                    <span className="inline-flex bg-violet-600 hover:bg-violet-700 text-white font-extrabold px-5 py-2.5 rounded-xl transition text-xs shadow-md shadow-violet-600/10 cursor-pointer">
                      Order Now
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Deal 2: High Protein */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row h-full"
            >
              <div className="relative w-full sm:w-2/5 min-h-[160px] sm:min-h-full bg-slate-50">
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500"
                  alt="AI Recommended High Protein"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 text-[10px] font-bold text-violet-700 uppercase tracking-wide">
                    ✨ AI Recommended
                  </span>
                  <h4 className="font-black text-slate-800 text-lg">AI Picked: High Protein</h4>
                  <p className="text-xs text-slate-500 font-medium">Perfect for your fitness goals</p>
                </div>
                <div className="flex items-center justify-between gap-2 pt-2">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900">Rs. 329</span>
                      <span className="text-xs line-through text-slate-400 font-bold">Rs. 469</span>
                    </div>
                    <span className="inline-block self-start mt-1 bg-emerald-50 text-[10px] font-bold text-emerald-700 px-2 py-0.5 rounded-md">
                      Save 34%
                    </span>
                  </div>
                  <Link href="/ai-assistant?prompt=Apply the AI Picked High Protein deal for Rs. 329">
                    <span className="inline-flex bg-violet-600 hover:bg-violet-700 text-white font-extrabold px-5 py-2.5 rounded-xl transition text-xs shadow-md shadow-violet-600/10 cursor-pointer">
                      Order Now
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Student Exclusive Verification Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-emerald-600/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Details */}
            <div className="lg:col-span-8 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[10px] font-bold tracking-wider uppercase border border-white/20">
                🎓 Student Exclusive
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
                Get 20% Off on All Orders!
              </h2>
              <p className="text-emerald-50 text-sm sm:text-base font-medium opacity-90 max-w-xl">
                Valid for all university students. Simply verify your student email to unlock this exclusive discount.
              </p>

              <div className="pt-2">
                {isVerified ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 bg-emerald-700/50 border border-white/25 px-5 py-3 rounded-2xl"
                  >
                    <span className="text-lg">✅</span>
                    <span className="font-bold text-sm">Student Status Verified! 20% discount applied.</span>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setShowVerifyModal(true)}
                    className="bg-white hover:bg-emerald-50 text-emerald-700 font-extrabold px-6 py-3 rounded-2xl shadow-md transition hover:scale-102 active:scale-98 text-sm cursor-pointer"
                  >
                    Verify Student Status
                  </button>
                )}
              </div>
            </div>

            {/* Percentage Stamp Stamp Badge */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-40 h-40 flex items-center justify-center bg-white/10 rounded-full border-4 border-dashed border-white/20 animate-spin-slow">
                <div className="w-28 h-28 rounded-full bg-amber-400 text-slate-900 flex flex-col items-center justify-center shadow-lg transform -rotate-12">
                  <span className="text-3xl font-black leading-none">20%</span>
                  <span className="text-[10px] font-bold tracking-widest mt-1 uppercase">% OFF %</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Verify Student Email Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-100 shadow-2xl relative"
          >
            <button
              onClick={() => setShowVerifyModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition cursor-pointer"
            >
              ✕
            </button>
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-800">Verify Student Email</h3>
              <p className="text-sm text-slate-500 font-medium">
                Enter your university student email (e.g. name@university.edu) to unlock your 20% flat discount.
              </p>
              <form onSubmit={handleVerify} className="space-y-4 pt-2">
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={verifyEmail}
                  onChange={(e) => setVerifyEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl shadow-md shadow-emerald-600/10 transition cursor-pointer text-sm"
                >
                  Verify Now
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
