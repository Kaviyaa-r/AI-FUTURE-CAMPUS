// ═══════════════════════════════════════════════════════════
// LoginForm.jsx — SkillBridge Login
// Fields: email, password, remember me toggle
// Forgot password mock, Google OAuth mock
// localStorage credential check
// ═══════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore, useToast } from './useAuthStore';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Info, Zap } from 'lucide-react';

// ─── Zod Schema Validation ──────────────────────────────
const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const LoginForm = ({ onLoginComplete, onGoSignup, toast: propToast }) => {
  const auth = useAuthStore();
  const contextToast = useToast();
  const toast = propToast || contextToast;

  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [inlineError, setInlineError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setInlineError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = auth.login(data.email, data.password);
    setLoading(false);

    if (!result.success) {
      setInlineError(result.error);
    } else {
      auth.persistSession(result.user.email, result.user.role, remember);
      toast?.('Welcome back! 👋', 'success');
      setTimeout(() => onLoginComplete(result.user), 400);
    }
  };

  const handleForgot = () => {
    setForgotSent(true);
    toast?.('Password reset link sent! Check your email.', 'info');
    setTimeout(() => setForgotSent(false), 5000);
  };

  return (
    <div className="screen">
      <div className="glass-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '10%' }}></div>
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
          <h2 className="title-lg">Welcome back</h2>
          <p className="text-sub" style={{ marginTop: '6px' }}>
            Login to your SkillBridge account
          </p>
        </div>

        {inlineError && (
          <div className="alert-error" style={{ marginBottom: '16px' }}>
            <AlertCircle className="w-[16px] h-[16px] text-[#EF4444]" /> {inlineError}
          </div>
        )}

        {forgotSent && (
          <div className="alert-info" style={{ marginBottom: '16px' }}>
            <Info className="w-[16px] h-[16px] text-[#06B6D4]" /> Reset link sent! Check your inbox.
          </div>
        )}

        <form
          id="login-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
        >
          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <Mail className="w-[16px] h-[16px]" />
              </span>
              <input
                id="login-email"
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
            <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <button
                id="login-forgot"
                type="button"
                className="link text-muted"
                style={{ fontSize: '0.8rem', fontWeight: '500' }}
                onClick={handleForgot}
              >
                Forgot password?
              </button>
            </div>
            <div className="input-wrapper">
              <span className="input-icon">
                <Lock className="w-[16px] h-[16px]" />
              </span>
              <input
                id="login-password"
                type={showPw ? 'text' : 'password'}
                className={`form-input has-right-icon ${errors.password ? 'input-error' : ''}`}
                placeholder="Your password"
                {...register('password')}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-icon-right"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? <EyeOff className="w-[16px] h-[16px]" /> : <Eye className="w-[16px] h-[16px]" />}
              </button>
            </div>
            {errors.password && (
              <span className="form-error">
                <AlertCircle className="w-[12px] h-[12px]" /> {errors.password.message}
              </span>
            )}
          </div>

          {/* Remember Me */}
          <div
            className="flex items-center gap-3"
            onClick={() => setRemember(!remember)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <div id="login-remember" className={`toggle ${remember ? 'on' : ''}`}></div>
            <span className="toggle-label">Remember me for 30 days</span>
          </div>

          <button
            id="login-submit"
            type="submit"
            className={`btn btn-primary btn-full btn-lg ${loading ? 'btn-loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Logging In...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 text-white" /> Login
              </>
            )}
          </button>

          <div className="divider">or</div>

          <button
            id="login-google"
            type="button"
            className="btn btn-google flex items-center justify-center gap-2"
            onClick={() => toast?.('Continuing with Google...', 'info')}
          >
            <span className="google-logo"></span>
            Continue with Google
          </button>

          <p className="text-center text-sub" style={{ fontSize: '0.88rem' }}>
            Don't have an account?{' '}
            <button type="button" className="link" onClick={onGoSignup}>
              Sign up — it's free
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

