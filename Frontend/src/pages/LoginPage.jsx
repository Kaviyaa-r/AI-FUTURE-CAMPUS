import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight, Sparkles } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage({ onLogin, onGoSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin(data);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#06B6D4]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Ambient grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.025)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <div className="p-2 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30">
              <Zap className="w-7 h-7 text-[#06B6D4]" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-[#F1F0FF] tracking-tight">
            Skill<span className="text-[#06B6D4]">Bridge</span>
          </h1>
          <p className="text-[#6B7280] text-sm">Student Employability Intelligence OS</p>
        </div>

        {/* Login Card */}
        <div
          style={{
            background: 'rgba(18,18,26,0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
          className="rounded-2xl p-8 shadow-2xl"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#F1F0FF]">Welcome back</h2>
            <p className="text-[#6B7280] text-sm mt-1">Sign in to your SkillBridge account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="you@university.edu"
                className="w-full bg-[#0A0A0F]/80 border border-[#7C3AED]/20 rounded-xl py-3 px-4 text-[#F1F0FF] placeholder-[#6B7280] focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 transition-all text-sm"
              />
              {errors.email && (
                <p className="text-[#EF4444] text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="••••••••"
                  className="w-full bg-[#0A0A0F]/80 border border-[#7C3AED]/20 rounded-xl py-3 px-4 pr-11 text-[#F1F0FF] placeholder-[#6B7280] focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#A78BFA] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#EF4444] text-xs">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-[#A78BFA] hover:text-[#67E8F9] transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                isValid && !isLoading
                  ? 'bg-[#7C3AED] hover:bg-[#A78BFA] text-[#F1F0FF] shadow-lg shadow-[#7C3AED]/25 hover:scale-[1.02] cursor-pointer'
                  : 'bg-[#12121A] border border-[#7C3AED]/10 text-[#6B7280] cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-[#A78BFA]/30 border-t-[#A78BFA] animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#7C3AED]/10" />
            <span className="text-[#6B7280] text-xs">or</span>
            <div className="flex-1 h-px bg-[#7C3AED]/10" />
          </div>

          {/* Demo Login */}
          <button
            type="button"
            onClick={() => onLogin({ email: 'demo@skillbridge.ai', password: 'demo123' })}
            className="w-full py-2.5 rounded-xl font-semibold text-xs text-[#67E8F9] border border-[#06B6D4]/30 hover:bg-[#06B6D4]/10 hover:border-[#06B6D4]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Continue with Demo Account
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-[#6B7280] text-sm mt-6">
            New to SkillBridge?{' '}
            <button
              type="button"
              onClick={onGoSignup}
              className="text-[#A78BFA] hover:text-[#67E8F9] font-semibold transition-colors cursor-pointer"
            >
              Create an account →
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-[#6B7280] text-xs mt-6">
          Powered by AI Career Intelligence · SkillBridge OS v2.0
        </p>
      </motion.div>
    </div>
  );
}
