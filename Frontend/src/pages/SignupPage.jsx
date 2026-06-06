import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Zap, User, ArrowRight, GraduationCap, CheckCircle } from 'lucide-react';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must include at least one uppercase letter')
    .regex(/[0-9]/, 'Must include at least one number'),
  confirmPassword: z.string(),
  role: z.enum(['student', 'graduate', 'professional']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const PERKS = [
  'AI-powered skill gap analysis',
  '9-step employability profiling',
  'Custom career roadmap builder',
  'Live JD matching engine',
];

export default function SignupPage({ onSignup, onGoLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'student' },
    mode: 'onChange',
  });

  const password = watch('password') || '';

  const strengthLevel = () => {
    if (password.length === 0) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    return score;
  };

  const strengthColors = ['bg-[#EF4444]', 'bg-[#F59E0B]', 'bg-[#F59E0B]', 'bg-[#10B981]', 'bg-[#10B981]'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strength = strengthLevel();

  const onSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignup(data);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#06B6D4]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Ambient grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.025)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Left — Brand & Perks panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col gap-8 pr-8"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30">
                <Zap className="w-7 h-7 text-[#06B6D4]" />
              </div>
            </div>
            <h1 className="text-4xl font-extrabold text-[#F1F0FF] tracking-tight leading-tight">
              Skill<span className="text-[#06B6D4]">Bridge</span>
            </h1>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              The AI-powered employability intelligence platform built for students who are serious about their career trajectory.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold text-[#A78BFA] uppercase tracking-widest">What you unlock</p>
            {PERKS.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-3 text-sm text-[#F1F0FF]"
              >
                <div className="w-5 h-5 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                {perk}
              </motion.div>
            ))}
          </div>

          <div
            style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.15)' }}
            className="rounded-xl p-4"
          >
            <p className="text-xs text-[#67E8F9] font-semibold">🚀 Join 12,000+ students</p>
            <p className="text-xs text-[#6B7280] mt-1">who have already mapped their career trajectories with SkillBridge</p>
          </div>
        </motion.div>

        {/* Right — Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        >
          {/* Mobile brand header */}
          <div className="text-center mb-6 lg:hidden">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="p-2 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30">
                <Zap className="w-6 h-6 text-[#06B6D4]" />
              </div>
              <h1 className="text-3xl font-extrabold text-[#F1F0FF]">
                Skill<span className="text-[#06B6D4]">Bridge</span>
              </h1>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(18,18,26,0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(124,58,237,0.2)',
            }}
            className="rounded-2xl p-7 shadow-2xl"
          >
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#F1F0FF]">Create your account</h2>
              <p className="text-[#6B7280] text-sm mt-1">Start your career intelligence journey</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Full Name
                </label>
                <input
                  type="text"
                  {...register('fullName')}
                  placeholder="Alex Chen"
                  className="w-full bg-[#0A0A0F]/80 border border-[#7C3AED]/20 rounded-xl py-2.5 px-4 text-[#F1F0FF] placeholder-[#6B7280] focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 transition-all text-sm"
                />
                {errors.fullName && <p className="text-[#EF4444] text-xs">{errors.fullName.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="you@university.edu"
                  className="w-full bg-[#0A0A0F]/80 border border-[#7C3AED]/20 rounded-xl py-2.5 px-4 text-[#F1F0FF] placeholder-[#6B7280] focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 transition-all text-sm"
                />
                {errors.email && <p className="text-[#EF4444] text-xs">{errors.email.message}</p>}
              </div>

              {/* Role selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> I am a...
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'student', label: 'Student' },
                    { value: 'graduate', label: 'Graduate' },
                    { value: 'professional', label: 'Professional' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="flex-1 cursor-pointer"
                    >
                      <input
                        type="radio"
                        {...register('role')}
                        value={opt.value}
                        className="sr-only peer"
                      />
                      <div className="text-center py-2 rounded-xl border border-[#7C3AED]/15 text-[#6B7280] text-xs font-semibold peer-checked:border-[#7C3AED] peer-checked:bg-[#7C3AED]/15 peer-checked:text-[#A78BFA] transition-all cursor-pointer hover:border-[#7C3AED]/35">
                        {opt.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="Min 8 chars, uppercase + number"
                    className="w-full bg-[#0A0A0F]/80 border border-[#7C3AED]/20 rounded-xl py-2.5 px-4 pr-11 text-[#F1F0FF] placeholder-[#6B7280] focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#A78BFA] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength bar */}
                {password.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            strength >= level ? strengthColors[strength] : 'bg-[#1A1A24]'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-[#6B7280]">
                      Strength: <span className="font-semibold" style={{ color: strength >= 3 ? '#10B981' : strength >= 2 ? '#F59E0B' : '#EF4444' }}>
                        {strengthLabels[strength]}
                      </span>
                    </p>
                  </div>
                )}
                {errors.password && <p className="text-[#EF4444] text-xs">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    placeholder="Re-enter password"
                    className="w-full bg-[#0A0A0F]/80 border border-[#7C3AED]/20 rounded-xl py-2.5 px-4 pr-11 text-[#F1F0FF] placeholder-[#6B7280] focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#A78BFA] transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-[#EF4444] text-xs">{errors.confirmPassword.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 mt-2 ${
                  isValid && !isLoading
                    ? 'bg-[#7C3AED] hover:bg-[#A78BFA] text-[#F1F0FF] shadow-lg shadow-[#7C3AED]/25 hover:scale-[1.02] cursor-pointer'
                    : 'bg-[#12121A] border border-[#7C3AED]/10 text-[#6B7280] cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-[#A78BFA]/30 border-t-[#A78BFA] animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Launch My Profile <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-[#6B7280] text-sm mt-5">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onGoLogin}
                className="text-[#A78BFA] hover:text-[#67E8F9] font-semibold transition-colors cursor-pointer"
              >
                Sign in →
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
