import React, { useEffect, useState } from 'react';
import { useProfile } from '../../../context/useProfileStore';
import { Check, Edit, Save, ArrowRight, ShieldCheck, Mail, MapPin, GraduationCap, Cpu, FolderOpen, Award, Target, Settings } from 'lucide-react';

export default function ProfileSummary({ onSave }) {
  const { state, goToStep, completenessScore } = useProfile();
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate the completeness score numbers on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = completenessScore;
      if (start === end) return;

      const duration = 1000;
      const stepTime = Math.abs(Math.floor(duration / end));

      const interval = setInterval(() => {
        start += 1;
        setAnimatedScore(start);
        if (start >= end) {
          clearInterval(interval);
        }
      }, stepTime);

      return () => clearInterval(interval);
    }, 100);
    return () => clearTimeout(timer);
  }, [completenessScore]);

  // SVG Progress Ring calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Color selection based on score
  const getProgressColor = (score) => {
    if (score >= 80) return '#10B981'; // success (green)
    if (score >= 50) return '#F59E0B'; // warning (amber)
    return '#EF4444'; // error (red)
  };

  const progressColor = getProgressColor(completenessScore);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-glow-purple text-text flex items-center justify-center gap-2">
          <ShieldCheck className="text-purple w-6 h-6" /> Profile Core Synthesis
        </h2>
        <p className="text-muted text-sm">Review your compiled student identity before committing telemetry save</p>
      </div>

      {/* Progress Ring and Stats */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-5 bg-[#12121A]/80 border border-purple/10 rounded-xl">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-[#1A1A24]"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke={progressColor}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-extrabold text-text" style={{ color: progressColor }}>
              {animatedScore}%
            </span>
            <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Completeness</span>
          </div>
        </div>

        <div className="text-center md:text-left space-y-2 flex-1">
          <h3 className="text-base font-bold text-purpleLight">Matrix Scan Completed</h3>
          <p className="text-xs text-muted max-w-sm">
            {completenessScore >= 80
              ? 'Your profile is highly comprehensive, making it optimal for running career alignment and skill gap simulations.'
              : completenessScore >= 50
              ? 'Your profile is moderately detailed. We recommend reviewing key areas to improve career alignment accuracy.'
              : 'Your profile has limited telemetry data. We highly suggest filling in more tech stacks, projects, and experiences.'}
          </p>
        </div>
      </div>

      {/* Grid of Sections to Review */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[320px] overflow-y-auto pr-1">
        {/* Step 1: Personal */}
        <div className="p-4 rounded-xl border border-purple/10 bg-[#12121A]/40 space-y-3 relative group">
          <button
            onClick={() => goToStep(1)}
            className="absolute top-3 right-3 text-muted hover:text-purple transition-colors p-1"
          >
            <Edit className="w-4 h-4" />
          </button>
          <h4 className="text-xs font-extrabold text-purpleLight tracking-wider uppercase flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> 1. Personal Details
          </h4>
          <div className="flex items-center gap-3">
            {state.personal.photo && (
              <img src={state.personal.photo} alt="Avatar" className="w-12 h-12 rounded-full border border-purple/20" />
            )}
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-text text-sm">{state.personal.name || 'Not filled'}</p>
              <p className="text-muted">{state.personal.course} ({state.personal.year})</p>
              <p className="text-teal font-medium">{state.personal.college} · {state.personal.city}</p>
            </div>
          </div>
        </div>

        {/* Step 2: Academics */}
        <div className="p-4 rounded-xl border border-purple/10 bg-[#12121A]/40 space-y-3 relative group">
          <button
            onClick={() => goToStep(2)}
            className="absolute top-3 right-3 text-muted hover:text-purple transition-colors p-1"
          >
            <Edit className="w-4 h-4" />
          </button>
          <h4 className="text-xs font-extrabold text-purpleLight tracking-wider uppercase flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" /> 2. Academic Metrics
          </h4>
          <div className="text-xs space-y-1">
            <p className="font-bold text-text">
              Major: <span className="text-tealLight">{state.academics.major || 'Not filled'}</span>
            </p>
            <p className="text-muted">
              Score: <span className="text-text font-bold font-mono">{state.academics.cgpaValue || '0'}</span> ({state.academics.cgpaType === 'cgpa' ? 'CGPA' : 'Percentage'})
            </p>
            {state.academics.achievements && (
              <p className="text-[10px] text-purpleLight line-clamp-1 italic">"{state.academics.achievements}"</p>
            )}
          </div>
        </div>

        {/* Step 3: Technical Skills */}
        <div className="p-4 rounded-xl border border-purple/10 bg-[#12121A]/40 space-y-2 relative group">
          <button
            onClick={() => goToStep(3)}
            className="absolute top-3 right-3 text-muted hover:text-purple transition-colors p-1"
          >
            <Edit className="w-4 h-4" />
          </button>
          <h4 className="text-xs font-extrabold text-purpleLight tracking-wider uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> 3. Tech Stack ({state.skills?.length || 0})
          </h4>
          <div className="flex flex-wrap gap-1">
            {state.skills?.length === 0 ? (
              <span className="text-xs text-muted">No skills added</span>
            ) : (
              state.skills?.map((s, idx) => (
                <span key={idx} className="text-[9px] px-2 py-0.5 rounded-full bg-purple/10 border border-purple/20 text-purpleLight font-bold">
                  {s.name} ({s.level[0]})
                </span>
              ))
            )}
          </div>
        </div>

        {/* Step 4: Soft Skills */}
        <div className="p-4 rounded-xl border border-purple/10 bg-[#12121A]/40 space-y-2 relative group">
          <button
            onClick={() => goToStep(4)}
            className="absolute top-3 right-3 text-muted hover:text-purple transition-colors p-1"
          >
            <Edit className="w-4 h-4" />
          </button>
          <h4 className="text-xs font-extrabold text-purpleLight tracking-wider uppercase flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5" /> 4. Soft Skills
          </h4>
          <div className="flex flex-wrap gap-1">
            {Object.keys(state.softSkills).length === 0 ? (
              <span className="text-xs text-muted">No soft skills rated</span>
            ) : (
              Object.entries(state.softSkills).map(([name, rating]) => (
                <span key={name} className="text-[9px] px-2 py-0.5 rounded bg-teal/15 text-tealLight font-bold border border-teal/20 capitalize">
                  {name}: {rating}/5
                </span>
              ))
            )}
          </div>
        </div>

        {/* Step 5: Experience */}
        <div className="p-4 rounded-xl border border-purple/10 bg-[#12121A]/40 space-y-2 relative group">
          <button
            onClick={() => goToStep(5)}
            className="absolute top-3 right-3 text-muted hover:text-purple transition-colors p-1"
          >
            <Edit className="w-4 h-4" />
          </button>
          <h4 className="text-xs font-extrabold text-purpleLight tracking-wider uppercase flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5" /> 5. Experience
          </h4>
          <div className="text-xs space-y-1">
            {!state.experience.hasExperience ? (
              <p className="text-muted italic">Fresher pathway selected</p>
            ) : state.experience.list?.length === 0 ? (
              <p className="text-muted italic">None added</p>
            ) : (
              state.experience.list?.map((exp) => (
                <div key={exp.id} className="border-l border-teal pl-2 py-0.5">
                  <p className="font-bold text-text">{exp.role} <span className="text-[10px] text-muted">at</span> {exp.company}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Step 6: Projects */}
        <div className="p-4 rounded-xl border border-purple/10 bg-[#12121A]/40 space-y-2 relative group">
          <button
            onClick={() => goToStep(6)}
            className="absolute top-3 right-3 text-muted hover:text-purple transition-colors p-1"
          >
            <Edit className="w-4 h-4" />
          </button>
          <h4 className="text-xs font-extrabold text-purpleLight tracking-wider uppercase flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5" /> 6. Repositories ({state.projects?.length || 0})
          </h4>
          <div className="text-xs space-y-1">
            {state.projects?.length === 0 ? (
              <p className="text-muted italic">No repositories added</p>
            ) : (
              state.projects?.map((proj) => (
                <div key={proj.id} className="flex justify-between items-center text-[11px]">
                  <span className="font-semibold text-text">{proj.title}</span>
                  <span className="text-[9px] text-muted max-w-[150px] overflow-hidden truncate">{proj.stack.join(', ')}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Step 7: Certifications */}
        <div className="p-4 rounded-xl border border-purple/10 bg-[#12121A]/40 space-y-2 relative group">
          <button
            onClick={() => goToStep(7)}
            className="absolute top-3 right-3 text-muted hover:text-purple transition-colors p-1"
          >
            <Edit className="w-4 h-4" />
          </button>
          <h4 className="text-xs font-extrabold text-purpleLight tracking-wider uppercase flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> 7. Certifications
          </h4>
          <div className="text-xs space-y-1">
            {state.certifications?.length === 0 ? (
              <p className="text-muted italic">No certificates listed</p>
            ) : (
              state.certifications?.map((c) => (
                <div key={c.id} className="text-[11px] truncate">
                  <span className="font-semibold text-text">{c.name}</span> <span className="text-[9px] text-teal">({c.platform})</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Step 8 & 9: Goals & preferences */}
        <div className="p-4 rounded-xl border border-purple/10 bg-[#12121A]/40 space-y-2 relative group">
          <button
            onClick={() => goToStep(8)}
            className="absolute top-3 right-3 text-muted hover:text-purple transition-colors p-1"
          >
            <Edit className="w-4 h-4" />
          </button>
          <h4 className="text-xs font-extrabold text-purpleLight tracking-wider uppercase flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" /> 8 & 9. Target & Learning Format
          </h4>
          <div className="text-xs space-y-1">
            <p className="font-bold text-text">Target: <span className="text-tealLight">{state.careerGoals.dreamRole || 'Not filled'}</span></p>
            <p className="text-muted">Style: {state.careerGoals.workPreference} · commit {state.preferences.hoursPerWeek} hrs/wk</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 pt-4 border-t border-purple/10">
        <button
          type="button"
          onClick={() => goToStep(9)}
          className="px-6 py-2.5 rounded-lg font-semibold bg-[#12121A] border border-purple/20 text-purpleLight hover:bg-purple/10 hover:border-purpleLight transition-all duration-300"
        >
          Back to Study Format
        </button>
        <button
          type="button"
          onClick={onSave}
          className="px-6 py-2.5 rounded-lg font-semibold bg-success hover:bg-[#10B981]/80 text-text shadow-lg hover:shadow-success/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Profile Matrix
        </button>
      </div>
    </div>
  );
}
