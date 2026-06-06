// ═══════════════════════════════════════════════════════════════
// App.jsx — SkillBridge Full Flow Entry Point
// AuthShell → ProfileWizard → Claude API call → Dashboard
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import AuthShell from './components/auth/AuthShell';
import { AuthProvider, ToastProvider } from './components/auth/useAuthStore';

function AppContent() {
  const [screen, setScreen] = useState('auth'); // auth | onboarding | dashboard

  // ─── SESSION CHECK ─────────────────────────────────────────
  // On mount, check if the user already has an active session
  useEffect(() => {
    const session = localStorage.getItem('ag_session') || sessionStorage.getItem('ag_session');
    const profile = localStorage.getItem('antigravity_student_profile');
    const analysis = localStorage.getItem('antigravity_analysis');

    if (session && profile && analysis) {
      setScreen('dashboard'); // returning user, skip auth + onboarding
    } else if (session && profile) {
      setScreen('onboarding'); // completed auth, not onboarding
    }
    // else stay on auth
  }, []);

  return (
    <>
      {screen === 'auth' && (
        <AuthShell
          onLoginComplete={() => setScreen('dashboard')}
          onSignupComplete={() => setScreen('onboarding')}
        />
      )}

      {screen === 'onboarding' && (
        <div className="screen" style={{ color: '#fff', textAlign: 'center', paddingTop: '20vh' }}>
          <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="logo-xl" style={{ margin: '0 auto 20px' }}>⚡</div>
            <h2 className="title-lg gradient-text" style={{ marginBottom: '12px' }}>Profile Onboarding</h2>
            <p className="text-sub">
              Your <code style={{ color: 'var(--accent-teal)', background: 'rgba(6,182,212,0.08)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.85rem' }}>&lt;ProfileWizard /&gt;</code> mounts here.
            </p>
            <p className="text-muted" style={{ marginTop: '12px', fontSize: '0.82rem' }}>
              Wire up the onboarding module per the CRED prompt spec.
            </p>
            <button
              className="btn btn-teal btn-lg btn-full"
              style={{ marginTop: '24px' }}
              onClick={() => setScreen('dashboard')}
            >
              Skip to Dashboard →
            </button>
          </div>
        </div>
      )}

      {screen === 'dashboard' && (
        <div className="screen" style={{ color: '#fff', textAlign: 'center', paddingTop: '20vh' }}>
          <div className="glass-card" style={{ maxWidth: '520px', margin: '0 auto' }}>
            <div style={{
              width: '72px', height: '72px',
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-teal))',
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', margin: '0 auto 20px',
              boxShadow: 'var(--glow-purple)'
            }}>🚀</div>
            <h2 className="title-lg" style={{ marginBottom: '8px' }}>
              Dashboard
            </h2>
            <p className="text-sub" style={{ marginBottom: '24px' }}>
              SkillBridge is running perfectly. Your AI Employability Score and Skill Gap Report mounts here.
            </p>
            <button
              className="btn btn-ghost btn-full"
              onClick={() => {
                localStorage.removeItem('ag_session');
                sessionStorage.removeItem('ag_session');
                setScreen('auth');
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}
