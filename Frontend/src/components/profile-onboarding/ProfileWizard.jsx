import React, { useState } from 'react';
import { useProfile } from '../../context/useProfileStore';
import { motion, AnimatePresence } from 'framer-motion';
import Step1Personal from './steps/Step1Personal';
import Step2Academics from './steps/Step2Academics';
import Step3Skills from './steps/Step3Skills';
import Step4SoftSkills from './steps/Step4SoftSkills';
import Step5Experience from './steps/Step5Experience';
import Step6Projects from './steps/Step6Projects';
import Step7Certifications from './steps/Step7Certifications';
import Step8CareerGoals from './steps/Step8CareerGoals';
import Step9Preferences from './steps/Step9Preferences';
import ProfileSummary from './steps/ProfileSummary';
import { Sparkles, Terminal } from 'lucide-react';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -150 : 150,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ProfileWizard({ onComplete }) {
  const { state, nextStep, prevStep, goToStep } = useProfile();
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleNext = () => {
    setDirection(1);
    nextStep();
  };

  const handleBack = () => {
    setDirection(-1);
    prevStep();
  };

  const handleGoTo = (stepNum) => {
    setDirection(stepNum > state.step ? 1 : -1);
    goToStep(stepNum);
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      if (onComplete) onComplete();
    }, 1500);
  };

  // Helper to render the appropriate step
  const renderStep = () => {
    switch (state.step) {
      case 1:
        return <Step1Personal onNext={handleNext} direction={direction} />;
      case 2:
        return <Step2Academics onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3Skills onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4SoftSkills onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <Step5Experience onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <Step6Projects onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <Step7Certifications onNext={handleNext} onBack={handleBack} />;
      case 8:
        return <Step8CareerGoals onNext={handleNext} onBack={handleBack} />;
      case 9:
        return <Step9Preferences onNext={handleNext} onBack={handleBack} />;
      case 10:
        return <ProfileSummary onSave={handleSave} />;
      default:
        return <Step1Personal onNext={handleNext} direction={direction} />;
    }
  };

  const stepPercentage = ((state.step - 1) / 9) * 100;

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8 z-10">
      {/* Background glow elements */}
      <div className="bg-glow-purple top-10 left-10" />
      <div className="bg-glow-teal bottom-10 right-10" />

      {/* Main Glassmorphism container */}
      <div className="glass-panel rounded-2xl shadow-glass border border-purple/20 overflow-hidden relative backdrop-blur-md">
        
        {/* Header Indicator / Progress Bar */}
        <div className="p-4 bg-[#12121A]/60 border-b border-purple/10 flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <div className="flex items-center gap-2 text-purpleLight font-bold">
              <Terminal className="w-4 h-4 text-teal" /> 
              <span>SKILLBRIDGE PROFILE WIZARD</span>
            </div>
            <div className="text-muted font-semibold">
              STEP {Math.min(state.step, 9)} OF 9:{' '}
              <span className="text-tealLight">
                {state.step === 1 && 'Personal Matrix'}
                {state.step === 2 && 'Academic Parameters'}
                {state.step === 3 && 'Core Skills Registry'}
                {state.step === 4 && 'Cognitive Profile'}
                {state.step === 5 && 'Professional Chronicles'}
                {state.step === 6 && 'Sandbox Repositories'}
                {state.step === 7 && 'Verified Credentials'}
                {state.step === 8 && 'Dream Role Goals'}
                {state.step === 9 && 'Training Protocols'}
                {state.step === 10 && 'Profile Compilation & Review'}
              </span>
            </div>
          </div>

          {/* Glowing slide progress line */}
          <div className="w-full h-1 bg-[#1A1A24] rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-purple via-purpleLight to-teal shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              animate={{ width: `${state.step === 10 ? 100 : stepPercentage}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>

          {/* Quick jump navigation steps (Desktop only) */}
          <div className="hidden md:flex justify-between text-[10px] font-bold text-muted pt-1 select-none">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((stepNum) => {
              const isActive = state.step === stepNum;
              const isCompleted = state.step > stepNum;
              return (
                <button
                  key={stepNum}
                  type="button"
                  onClick={() => handleGoTo(stepNum)}
                  className={`transition-colors uppercase duration-200 cursor-pointer ${
                    isActive
                      ? 'text-tealLight scale-105'
                      : isCompleted
                      ? 'text-purple'
                      : 'hover:text-purpleLight'
                  }`}
                >
                  {stepNum === 10 ? 'Review' : `S${stepNum}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Body wrapper with animation container */}
        <div className="p-6 md:p-8 min-h-[460px] flex flex-col justify-between relative">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            {savedSuccess ? (
              <motion.div
                key="saved-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-success/20 border-2 border-success flex items-center justify-center text-success animate-bounce">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-glow-teal text-success">Profile Telemetry Synchronized!</h3>
                <p className="text-muted text-sm max-w-xs">
                  Your student employability profile has been committed successfully to AntiGravity system modules.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={state.step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex-1"
              >
                {renderStep()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
