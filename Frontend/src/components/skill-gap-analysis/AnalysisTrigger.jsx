import React from 'react';
import { motion } from 'framer-motion';
import { Play, ShieldAlert, Cpu, Terminal, Compass, Sparkles } from 'lucide-react';

export default function AnalysisTrigger({ name, careerGoal, screen, progress, loadingMessage, onRun }) {
  const isScanning = screen === 'loading';

  return (
    <div className="w-full max-w-xl mx-auto py-12 px-4 relative">
      <div className="bg-glow-purple top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="glass-panel border border-purple/20 rounded-2xl shadow-glass overflow-hidden relative p-8 md:p-10 backdrop-blur-md">
        
        {/* Futuristic Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {!isScanning ? (
          <div className="space-y-8 text-center relative z-10">
            <div className="space-y-3">
              <div className="inline-flex p-3 rounded-full bg-purple/10 border border-purple/35 text-purpleLight mb-2 animate-pulse">
                <Compass className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-glow-purple text-text">
                Employability Telemetry
              </h2>
              <p className="text-muted text-sm max-w-md mx-auto">
                Scan job listings, match academic profiles, and identify critical career vector alignments.
              </p>
            </div>

            {/* Target Role & Candidate Details Card */}
            <div className="p-5 rounded-xl border border-purple/20 bg-[#12121A]/60 space-y-4 max-w-sm mx-auto shadow-inner">
              <div className="space-y-1 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted">Active Candidate</span>
                <h3 className="text-lg font-bold text-text">{name}</h3>
              </div>
              <div className="h-px bg-purple/10" />
              <div className="space-y-1 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-teal">Target Career Vector</span>
                <h4 className="text-base font-extrabold text-tealLight flex items-center justify-center gap-1">
                  <Cpu className="w-4 h-4 text-teal animate-spin" style={{ animationDuration: '6s' }} /> {careerGoal}
                </h4>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onRun}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-purple hover:bg-purpleLight text-text font-bold shadow-glass-purple hover:shadow-purple/30 hover:scale-105 transition-all duration-300 cursor-pointer text-sm tracking-wider uppercase"
              >
                <Play className="w-4 h-4 fill-text" /> Run Gap Analysis
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 text-center relative z-10 py-4">
            <div className="space-y-3">
              <div className="inline-flex p-3 rounded-full bg-teal/10 border border-teal/35 text-tealLight mb-2 animate-bounce">
                <Terminal className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-glow-teal text-tealLight">
                Matrix Scanner Active
              </h2>
              <p className="text-xs font-mono text-muted tracking-wider">
                Syncing career listings for <span className="text-purpleLight font-semibold">{careerGoal}</span>...
              </p>
            </div>

            {/* Simulated Scanning Progress Bar */}
            <div className="space-y-3 max-w-md mx-auto">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-muted">SCAN STATUS</span>
                <span className="text-teal font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-[#1A1A24] rounded-full overflow-hidden border border-purple/10">
                <div
                  className="h-full bg-gradient-to-r from-teal to-tealLight shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Cycling terminal lines */}
            <div className="p-4 bg-[#0A0A0F] border border-purple/10 rounded-lg text-left font-mono text-xs max-w-sm mx-auto h-[70px] flex flex-col justify-center gap-1 shadow-inner">
              <div className="flex items-center gap-2 text-tealLight">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-ping" />
                <span>$ run --telemetry</span>
              </div>
              <div className="text-muted flex items-center gap-1 text-[11px] animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-purple" /> {loadingMessage}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
