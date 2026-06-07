"use client";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login form values:", data);
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
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back!</h1>
        <p className="text-slate-500 text-sm mt-2 font-medium">Sign in to your canteen account</p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/60 p-8"
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

          {/* Email Field */}
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
                📧
              </span>
              <input
                id="login-email"
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
            <div className="flex items-center justify-between">
              <label htmlFor="login-password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Password
              </label>
              <Link
                href="#"
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
                🔒
              </span>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
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

          {/* Submit Button */}
          <div className="pt-1">
            <button
              id="login-submit"
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
                  Signing in...
                </span>
              ) : (
                "Sign In →"
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* Social Sign-In (decorative) */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition text-sm font-semibold text-slate-700 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
      </motion.div>

      {/* Sign Up Link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm text-slate-500 font-medium mt-6"
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-orange-600 hover:text-orange-700 font-extrabold transition"
        >
          Create one free →
        </Link>
      </motion.p>
    </div>
  );
}