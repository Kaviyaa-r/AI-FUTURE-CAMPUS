// ═══════════════════════════════════════════════════════════
// SignupForm.jsx — SkillBridge Signup
// Fields: name, email, password, confirm, role toggle
// Password strength indicator (weak/medium/strong)
// React Hook Form + Zod validation, Google OAuth mock, localStorage auth
// ═══════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore, useToast } from './useAuthStore';
import { Sparkles, User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

// ─── Zod Schema Validation ──────────────────────────────
const signupSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Enter a valid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirm: z.string().min(1, { message: 'Please confirm your password' }),
    role: z.enum(['student', 'admin']),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

// ─── Password Strength ──────────────────────────────────
const passwordStrength = (pw) => {
  if (!pw || pw.length < 6) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12) score++;
  return Math.min(Math.ceil(score / 2), 3); // 1=weak, 2=medium, 3=strong
};

const StrengthBar = ({ password }) => {
  const strength = passwordStrength(password);
  const labels = ['', 'Weak', 'Medium', 'Strong'];
  const classes = ['', 'weak', 'medium', 'strong'];
  if (!password) return null;
  return (
    <div>
      <div className="strength-bar-wrap">
        {[1, 2, 3].map((seg) => (
          <div
            key={seg}
            className={`strength-seg ${strength >= seg ? `active-${classes[strength]}` : ''}`}
          />
        ))}
      </div>
      <div className={`strength-label ${classes[strength]}`}>{labels[strength]}</div>
    </div>
  );
};

const SignupForm = ({ onSignupComplete, onGoLogin, toast: propToast }) => {
  const auth = useAuthStore();
  const contextToast = useToast();
  const toast = propToast || contextToast;

  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
      role: 'student',
    },
  });

  const passwordVal = watch('password');
  const roleVal = watch('role');

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    auth.signup(data.name, data.email, data.password, data.role);
    auth.persistSession(data.email, data.role, true);
    setLoading(false);
    toast?.('Account created! Welcome to SkillBridge 🚀', 'success');
    setTimeout(() => onSignupComplete(data.role), 400);
  };

  const handleGoogle = () => {
    toast?.('Continuing with Google...', 'info');
  };

  return (
    <div className="screen">
      <div className="glass-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '33%' }}></div>
        </div>

        <div className="text-center" style={{ marginBottom: '28px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <div className="logo-icon text-white">⚡</div>
            <span className="logo">
              Skill<span className="logo-sub">Bridge</span>
            </span>
          </div>
          <h2 className="title-lg">Create your account</h2>
          <p className="text-sub" style={{ marginTop: '6px' }}>
            Start your AI-powered career journey
          </p>
        </div>

        <form
          id="signup-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
        >
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <User className="w-[16px] h-[16px]" />
              </span>
              <input
                id="signup-name"
                type="text"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="Kaviya Rajaraman"
                {...register('name')}
                autoComplete="name"
              />
            </div>
            {errors.name && (
              <span className="form-error">
                <AlertCircle className="w-[12px] h-[12px]" /> {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <Mail className="w-[16px] h-[16px]" />
              </span>
              <input
                id="signup-email"
                type="email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="you@college.edu"
                {...register('email')}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <span className="form-error">
                <AlertCircle className="w-[12px] h-[12px]" /> {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <Lock className="w-[16px] h-[16px]" />
              </span>
              <input
                id="signup-password"
                type={showPw ? 'text' : 'password'}
                className={`form-input has-right-icon ${errors.password ? 'input-error' : ''}`}
                placeholder="Min. 8 characters"
                {...register('password')}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-icon-right"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? <EyeOff className="w-[16px] h-[16px]" /> : <Eye className="w-[16px] h-[16px]" />}
              </button>
            </div>
            <StrengthBar password={passwordVal} />
            {errors.password && (
              <span className="form-error">
                <AlertCircle className="w-[12px] h-[12px]" /> {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <Lock className="w-[16px] h-[16px]" />
              </span>
              <input
                id="signup-confirm"
                type={showConfirm ? 'text' : 'password'}
                className={`form-input has-right-icon ${errors.confirm ? 'input-error' : ''}`}
                placeholder="Repeat password"
                {...register('confirm')}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-icon-right"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff className="w-[16px] h-[16px]" /> : <Eye className="w-[16px] h-[16px]" />}
              </button>
            </div>
            {errors.confirm && (
              <span className="form-error">
                <AlertCircle className="w-[12px] h-[12px]" /> {errors.confirm.message}
              </span>
            )}
          </div>

          {/* Role Toggle */}
          <div className="form-group">
            <label className="form-label">I am a</label>
            <div className="role-switch">
              {['student', 'admin'].map((r) => (
                <button
                  key={r}
                  id={`signup-role-${r}`}
                  type="button"
                  className={`role-switch-btn ${roleVal === r ? 'active' : ''}`}
                  onClick={() => setValue('role', r)}
                >
                  {r === 'student' ? '🎓 Student' : '🏫 College Admin'}
                </button>
              ))}
            </div>
          </div>

          <button
            id="signup-submit"
            type="submit"
            className={`btn btn-primary btn-full btn-lg ${loading ? 'btn-loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Creating Account...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-white" /> Create Account
              </>
            )}
          </button>

          <div className="divider">or continue with</div>

          <button id="signup-google" type="button" className="btn btn-google flex items-center justify-center gap-2" onClick={handleGoogle}>
            <span className="google-logo"></span>
            Continue with Google
          </button>

          <p className="text-center text-sub" style={{ fontSize: '0.88rem' }}>
            Already have an account?{' '}
            <button type="button" className="link" onClick={onGoLogin}>
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

