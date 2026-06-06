// ═══════════════════════════════════════════════════════════
// AuthShell.jsx — AntiGravity Auth Module Parent
// Manages which auth screen is shown: splash → signup/login → role
// No router dependency — uses internal screen state
// ═══════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './SplashScreen';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import RoleSelector from './RoleSelector';

const AuthShell = ({ onLoginComplete, onSignupComplete }) => {
  const [screen, setScreen] = useState('splash');
  const [pendingRole, setPendingRole] = useState(null);

  const handleSignupComplete = (role) => {
    if (!role) {
      setScreen('role');
    } else {
      onSignupComplete?.(role);
    }
  };

  const handleRoleContinue = (role) => {
    onSignupComplete?.(role);
  };

  const screens = {
    splash: (
      <SplashScreen
        onGetStarted={() => setScreen('signup')}
        onLogin={() => setScreen('login')}
      />
    ),
    signup: (
      <SignupForm
        onSignupComplete={handleSignupComplete}
        onGoLogin={() => setScreen('login')}
      />
    ),
    login: (
      <LoginForm
        onLoginComplete={onLoginComplete}
        onGoSignup={() => setScreen('signup')}
      />
    ),
    role: <RoleSelector onContinue={handleRoleContinue} />,
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0F] text-[#F8F8FF] overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="w-full min-h-screen flex items-center justify-center relative z-10"
        >
          {screens[screen]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthShell;

