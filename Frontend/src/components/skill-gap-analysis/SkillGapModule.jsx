import React from 'react';
import { useGapAnalysis } from './useGapAnalysis';
import AnalysisTrigger from './AnalysisTrigger';
import GapDashboard from './GapDashboard';

export default function SkillGapModule({ onUpdateProfile }) {
  const {
    screen,
    progress,
    loadingMessage,
    studentName,
    careerGoal,
    runAnalysis,
    resetAnalysis,
  } = useGapAnalysis();

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      {/* Ambient background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(124,58,237,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.025)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {screen === 'trigger' || screen === 'loading' ? (
        <div className="flex items-center justify-center min-h-screen py-12">
          <AnalysisTrigger
            name={studentName}
            careerGoal={careerGoal}
            screen={screen}
            progress={progress}
            loadingMessage={loadingMessage}
            onRun={runAnalysis}
          />
        </div>
      ) : (
        <div className="py-8">
          {/* Dashboard Header */}
          <div className="max-w-6xl mx-auto px-4 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-text text-glow-purple">
                  Skill Gap Analysis
                </h1>
                <p className="text-sm text-muted mt-1">
                  {studentName} · Career vector:{' '}
                  <span className="text-tealLight font-semibold">{careerGoal}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={resetAnalysis}
                className="text-xs uppercase font-bold border border-purple/20 text-purpleLight hover:bg-purple/10 px-4 py-2 rounded-lg transition-all cursor-pointer"
              >
                ↺ Re-run Analysis
              </button>
            </div>
          </div>

          <GapDashboard
            careerGoal={careerGoal}
            onUpdateSkills={onUpdateProfile}
          />
        </div>
      )}
    </div>
  );
}
