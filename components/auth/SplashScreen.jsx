// ═══════════════════════════════════════════════════════════
// SplashScreen.jsx — SkillBridge Landing Hero
// Full screen dark hero with animated gradient orbs,
// floating particles, and staggered Framer Motion fade-in animations.
// ═══════════════════════════════════════════════════════════

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Star, Rocket } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const SplashScreen = ({ onGetStarted, onLogin }) => {
  return (
    <div className="screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="splash"
      >
        {/* Beta Badge */}
        <motion.div variants={itemVariants} className="splash-badge">
          <span className="badge-dot"></span>
          Now in Beta — Limited Access
        </motion.div>

        {/* Logo + Title */}
        <motion.div variants={itemVariants} className="splash-logo text-center">
          <div className="logo-xl">
            <Zap className="w-9 h-9 text-white fill-white" />
          </div>
          <h1 className="title-xl">
            Skill<span className="gradient-text">Bridge</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p variants={itemVariants} className="splash-tagline">
          Your career. <strong style={{ color: 'var(--text-primary)' }}>Supercharged by AI.</strong>
          <br />
          Skill gaps closed. Employability unlocked. Future secured.
        </motion.p>

        {/* Feature Pills */}
        <motion.div variants={itemVariants} className="splash-features">
          {[
            { icon: <Zap className="w-4 h-4 text-[#06B6D4]" />, label: 'AI Skill Analysis' },
            { icon: <Star className="w-4 h-4 text-[#06B6D4]" />, label: 'Employability Score' },
            { icon: <Rocket className="w-4 h-4 text-[#06B6D4]" />, label: 'Career Roadmap' },
          ].map((f) => (
            <div key={f.label} className="splash-feature-item">
              <span className="dot">{f.icon}</span>
              {f.label}
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="splash-ctas">
          <button
            id="splash-get-started"
            className="btn btn-primary btn-lg btn-full flex items-center justify-center gap-2"
            onClick={onGetStarted}
          >
            <Sparkles className="w-5 h-5 text-white" /> Get Started — It's Free
          </button>
          <button
            id="splash-login"
            className="btn btn-ghost btn-lg btn-full flex items-center justify-center"
            onClick={onLogin}
          >
            Login to Your Account
          </button>
        </motion.div>

        <motion.p variants={itemVariants} className="text-muted" style={{ marginTop: '-8px' }}>
          Join 10,000+ students already on the platform
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;

