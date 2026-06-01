export default function Footer() {
    return (
        <footer className="bg-[#111827] text-slate-400 pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                {/* Brand Block */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">✨</span>
                        </div>
                        <span className="font-bold text-white text-lg tracking-tight">AI Smart Canteen</span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">
                        Your intelligent campus dining companion. Order smart, eat better with AI-powered recommendations.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
                    <ul className="space-y-2.5 text-sm">
                        {["Home", "Menu", "Deals", "Contact Us"].map((link) => (
                            <li key={link}><a href="#" className="hover:text-white transition">{link}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact Info</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">📞 <span>+91 98765 43210</span></li>
                        <li className="flex items-center gap-2">✉️ <span>support@aismartcanteen.edu</span></li>
                        <li className="flex items-center gap-2">📍 <span>University Campus, Main Block</span></li>
                    </ul>
                </div>

                {/* Newsletter / Social */}
                <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Follow Us</h4>
                    <div className="flex gap-3 mb-5">
                        {['𝕏', '📸', '💬', '💼'].map((icon, idx) => (
                            <button key={idx} className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-orange-600 hover:text-white transition flex items-center justify-center text-sm text-slate-300">
                                {icon}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-slate-800 text-white text-sm px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 flex-grow"
                        />
                        <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                © 2026 AI Smart Canteen Assistant. All rights reserved.
            </div>
        </footer>
    );
}