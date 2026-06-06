import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileProvider } from './context/useProfileStore';
import ProfileWizard from './components/profile-onboarding/ProfileWizard';
import SkillGapModule from './components/skill-gap-analysis/SkillGapModule';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Zap, User, BarChart2, LogOut, ChevronDown } from 'lucide-react';

export default function App() {
  // auth: 'login' | 'signup' | 'app'
  const [authScreen, setAuthScreen] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModule, setActiveModule] = useState('profile');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogin = (data) => {
    setCurrentUser({
      name: data.email.split('@')[0].replace('.', ' '),
      email: data.email,
    });
    setAuthScreen('app');
  };

  const handleSignup = (data) => {
    setCurrentUser({
      name: data.fullName,
      email: data.email,
      role: data.role,
    });
    setAuthScreen('app');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthScreen('login');
    setActiveModule('profile');
    setShowUserMenu(false);
  };

  // Format display name
  const displayName = currentUser?.name
    ? currentUser.name
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : '';

  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <AnimatePresence mode="wait">
      {authScreen === 'login' && (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <LoginPage
            onLogin={handleLogin}
            onGoSignup={() => setAuthScreen('signup')}
          />
        </motion.div>
      )}

      {authScreen === 'signup' && (
        <motion.div
          key="signup"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.3 }}
        >
          <SignupPage
            onSignup={handleSignup}
            onGoLogin={() => setAuthScreen('login')}
          />
        </motion.div>
      )}

      {authScreen === 'app' && (
        <motion.div
          key="app"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProfileProvider>
            <div className="min-h-screen bg-[#0A0A0F] text-[#F1F0FF] font-sans relative overflow-x-hidden">
              {/* Global ambient grid */}
              <div className="fixed inset-0 bg-[linear-gradient(rgba(124,58,237,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

              {/* ── Top Navigation Bar ── */}
              <nav className="sticky top-0 z-50 border-b border-[#7C3AED]/15 bg-[#0A0A0F]/85 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                  {/* Brand */}
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/30">
                      <Zap className="w-5 h-5 text-[#06B6D4]" />
                    </div>
                    <div>
                      <span className="font-extrabold text-xl text-[#F1F0FF] tracking-tight">
                        Skill<span className="text-[#06B6D4]">Bridge</span>
                      </span>
                      <span className="hidden md:inline text-[10px] text-[#6B7280] ml-2 uppercase tracking-widest font-bold">
                        Employability OS
                      </span>
                    </div>
                  </div>

                  {/* Module Tab Switcher */}
                  <div className="flex items-center gap-1 bg-[#12121A]/80 border border-[#7C3AED]/15 rounded-xl p-1">
                    <button
                      onClick={() => setActiveModule('profile')}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                        activeModule === 'profile'
                          ? 'bg-[#7C3AED]/25 text-[#A78BFA] border border-[#7C3AED]/40'
                          : 'text-[#6B7280] hover:text-[#A78BFA]'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Student Profile</span>
                      <span className="sm:hidden">Profile</span>
                    </button>
                    <button
                      onClick={() => setActiveModule('gap')}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                        activeModule === 'gap'
                          ? 'bg-[#06B6D4]/20 text-[#67E8F9] border border-[#06B6D4]/40'
                          : 'text-[#6B7280] hover:text-[#67E8F9]'
                      }`}
                    >
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Skill Gap Analysis</span>
                      <span className="sm:hidden">Gaps</span>
                    </button>
                  </div>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 bg-[#12121A]/80 border border-[#7C3AED]/15 rounded-xl px-3 py-1.5 hover:border-[#7C3AED]/35 transition-all cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-[#F1F0FF] font-extrabold text-[10px]">
                        {initials || 'SB'}
                      </div>
                      <span className="hidden md:inline text-xs font-semibold text-[#A78BFA] max-w-[120px] truncate">
                        {displayName || 'User'}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-52 rounded-xl border border-[#7C3AED]/20 bg-[#12121A]/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
                        >
                          <div className="p-3 border-b border-[#7C3AED]/10">
                            <p className="text-xs font-bold text-[#F1F0FF]">{displayName || 'User'}</p>
                            <p className="text-[10px] text-[#6B7280] truncate">{currentUser?.email}</p>
                            {currentUser?.role && (
                              <span className="text-[9px] bg-[#7C3AED]/15 text-[#A78BFA] px-2 py-0.5 rounded mt-1 inline-block font-bold uppercase tracking-wider capitalize">
                                {currentUser.role}
                              </span>
                            )}
                          </div>
                          <div className="p-1.5">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors cursor-pointer"
                            >
                              <LogOut className="w-3.5 h-3.5" /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </nav>

              {/* Close user menu on outside click */}
              {showUserMenu && (
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              )}

              {/* ── Module Content ── */}
              <main className="relative z-10">
                {activeModule === 'profile' ? (
                  <div className="flex items-start justify-center min-h-[calc(100vh-60px)] py-8 px-2">
                    <ProfileWizard onComplete={() => setActiveModule('gap')} />
                  </div>
                ) : (
                  <SkillGapModule onUpdateProfile={() => setActiveModule('profile')} />
                )}
              </main>
            </div>
          </ProfileProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
