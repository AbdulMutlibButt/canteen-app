"use client";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>();

  const passwordValue = watch("password");

  const onSubmit = (data: SignUpFormValues) => {
    console.log("Sign Up form values:", data);
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo / Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
            <span className="text-white font-black text-xl">✨</span>
          </div>
          <div className="text-left">
            <span className="font-black text-slate-900 text-lg tracking-tight leading-none block">AI Smart Canteen</span>
            <span className="text-[10px] text-slate-400 font-medium">Powered by AI</span>
          </div>
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create account</h1>
        <p className="text-slate-500 text-sm mt-2 font-medium">Join thousands of campus students</p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/60 p-8"
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label htmlFor="signup-name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
                👤
              </span>
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                {...register("name", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                })}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.name
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200 focus:ring-orange-500/20 focus:border-orange-500"
                }`}
              />
            </div>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold text-red-500 flex items-center gap-1"
              >
                ⚠️ {errors.name.message}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label htmlFor="signup-email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
                📧
              </span>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="you@university.edu"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.email
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200 focus:ring-orange-500/20 focus:border-orange-500"
                }`}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold text-red-500 flex items-center gap-1"
              >
                ⚠️ {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label htmlFor="signup-password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
                🔒
              </span>
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a strong password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Must contain uppercase, lowercase & number",
                  },
                })}
                className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.password
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200 focus:ring-orange-500/20 focus:border-orange-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition text-sm cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold text-red-500 flex items-center gap-1"
              >
                ⚠️ {errors.password.message}
              </motion.p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1.5">
            <label htmlFor="signup-confirm-password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
                🔒
              </span>
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.confirmPassword
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200 focus:ring-orange-500/20 focus:border-orange-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition text-sm cursor-pointer"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold text-red-500 flex items-center gap-1"
              >
                ⚠️ {errors.confirmPassword.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              id="signup-submit"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md shadow-orange-600/15 hover:shadow-lg hover:shadow-orange-600/20 hover:-translate-y-0.5 active:translate-y-0 text-sm cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account →"
              )}
            </button>
          </div>

          {/* Terms note */}
          <p className="text-center text-xs text-slate-400 font-medium">
            By signing up you agree to our{" "}
            <Link href="#" className="text-orange-600 hover:underline">Terms of Service</Link>
            {" "}&amp;{" "}
            <Link href="#" className="text-orange-600 hover:underline">Privacy Policy</Link>
          </p>
        </form>
      </motion.div>

      {/* Login Link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm text-slate-500 font-medium mt-6"
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-orange-600 hover:text-orange-700 font-extrabold transition"
        >
          Sign in →
        </Link>
      </motion.p>
    </div>
  );
}