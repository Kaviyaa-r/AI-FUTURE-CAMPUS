// ═══════════════════════════════════════════════════════════
// RoleSelector.jsx — SkillBridge Role Selection
// Post-signup screen: Student vs College Admin
// Selected card glows with purple border
// ═══════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Building, ArrowRight } from 'lucide-react';

const roles = [
  {
    id: 'student',
    icon: <GraduationCap className="w-7 h-7 text-[#7C3AED]" />,
    iconClass: 'role-icon-student',
    title: 'Student',
    desc: 'Get an AI-powered employability score, close skill gaps, and land your dream role.',
  },
  {
    id: 'admin',
    icon: <Building className="w-7 h-7 text-[#06B6D4]" />,
    iconClass: 'role-icon-admin',
    title: 'College Admin',
    desc: 'Track placement trends, identify skill gaps across your cohort, and improve outcomes.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const RoleSelector = ({ onContinue }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="glass-card"
        style={{ maxWidth: '500px' }}
      >
        <motion.div variants={itemVariants} className="text-center" style={{ marginBottom: '28px' }}>
          <div
            className="logo-icon text-white"
            style={{
              width: '56px',
              height: '56px',
              fontSize: '1.6rem',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ⚡
          </div>
          <h2 className="title-lg">Who are you?</h2>
          <p className="text-sub" style={{ marginTop: '6px' }}>
            We'll personalize your SkillBridge experience
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="role-cards" style={{ marginBottom: '24px' }}>
          {roles.map((r) => (
            <div
              id={`role-card-${r.id}`}
              key={r.id}
              className={`role-card ${selected === r.id ? 'selected' : ''}`}
              onClick={() => setSelected(r.id)}
            >
              <div className={`role-icon-wrap ${r.iconClass}`}>{r.icon}</div>
              <div className="role-text">
                <div className="role-title">{r.title}</div>
                <div className="role-desc">{r.desc}</div>
              </div>
              <div className="role-check">
                <div className="role-check-inner"></div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.button
          variants={itemVariants}
          id="role-continue"
          className="btn btn-primary btn-full btn-lg flex items-center justify-center gap-2"
          style={{
            opacity: selected ? 1 : 0.4,
            pointerEvents: selected ? 'auto' : 'none',
          }}
          onClick={() => selected && onContinue(selected)}
        >
          Continue as{' '}
          {selected === 'student'
            ? 'Student'
            : selected === 'admin'
              ? 'College Admin'
              : '...'}
          <ArrowRight className="w-5 h-5 text-white" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RoleSelector;

