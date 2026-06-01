"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { sendContactEmail } from "./action";

interface StatusState {
    type: "success" | "error" | null;
    text: string;
}

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<StatusState>({ type: null, text: "" });

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setStatusMessage({ type: null, text: "" });

        const response = await sendContactEmail(formData);

        setIsSubmitting(false);
        if (response.success) {
            setStatusMessage({ type: "success", text: "Thank you! Your message has been sent successfully." });
        } else {
            setStatusMessage({ type: "error", text: response.error || "Failed to deliver message." });
        }
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col font-sans">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full space-y-16">
                <div className="text-center max-w-xl mx-auto space-y-2">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Get in Touch</h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Have questions or feedback? We&apos;d love to hear from you. Our team is here to help!
                    </p>
                </div>

                {/* Info Grid Elements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl shrink-0">📞</div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Phone Number</h3>
                            <p className="text-slate-800 text-sm mt-2 font-semibold">+91 98765 43210</p>
                            <p className="text-slate-400 text-xs mt-1">Mon-Sat, 8AM-10PM</p>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">✉️</div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Email Address</h3>
                            <p className="text-slate-800 text-sm mt-2 font-semibold">support@aismartcanteen.edu</p>
                            <p className="text-slate-400 text-xs mt-1">We&apos;ll reply within 24 hours</p>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">📍</div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Location</h3>
                            <p className="text-slate-800 text-sm mt-2 font-semibold">University Campus, Main Block</p>
                            <p className="text-slate-400 text-xs mt-1">Ground Floor, Building A</p>
                        </div>
                    </div>
                </div>

                {/* Lower Content Split Form/Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 pb-2">
                            <span className="text-orange-600 text-xl">💬</span>
                            <h2 className="text-xl font-extrabold text-slate-900">Send us a Message</h2>
                        </div>

                        <form action={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john@university.edu"
                                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    placeholder="How can we help?"
                                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Tell us what's on your mind..."
                                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                                />
                            </div>

                            {statusMessage.text && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-xl text-xs font-bold ${statusMessage.type === "success"
                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                            : "bg-red-50 text-red-700 border border-red-100"
                                        }`}
                                >
                                    {statusMessage.text}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-bold py-3 px-6 rounded-xl transition shadow-md shadow-orange-600/10 text-sm flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending Message...
                                    </>
                                ) : (
                                    "Submit Message"
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                        <div className="relative aspect-[16/10] w-full bg-gradient-to-tr from-amber-100/60 to-emerald-100/60 rounded-2xl border border-slate-100 flex flex-col items-center justify-center p-6 text-center shadow-sm overflow-hidden group">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                            <div className="w-12 h-12 rounded-full bg-white text-slate-400 flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform duration-300">📍</div>
                            <h4 className="font-bold text-slate-800 text-sm">University Campus</h4>
                            <p className="text-slate-400 text-xs mt-0.5">Main Block, Ground Floor</p>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                                <span className="text-emerald-500 text-lg">🕒</span>
                                <h3 className="font-bold text-slate-900 text-base">Operating Hours</h3>
                            </div>

                            <div className="space-y-3 text-sm font-medium">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Monday - Friday</span>
                                    <span className="text-slate-900 font-bold">8:00 AM - 10:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Saturday</span>
                                    <span className="text-slate-900 font-bold">9:00 AM - 9:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Sunday</span>
                                    <span className="text-slate-400 font-bold text-xs bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-100">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>


        </div>
    );
}