import React, { useState } from 'react';
import { useProfile } from '../../../context/useProfileStore';
import { Brain, Users, Lightbulb, Zap, Shield, Compass, Eye, Heart } from 'lucide-react';

const SOFT_SKILLS_LIST = [
  { id: 'communication', name: 'Communication', desc: 'Articulation & effective listening', icon: Brain },
  { id: 'teamwork', name: 'Teamwork', desc: 'Collaboration in cross-functional groups', icon: Users },
  { id: 'problemSolving', name: 'Problem Solving', desc: 'Structured analysis & debugging', icon: Lightbulb },
  { id: 'leadership', name: 'Leadership', desc: 'Guiding teams & mentoring peers', icon: Shield },
  { id: 'adaptability', name: 'Adaptability', desc: 'Thriving under pivoting circumstances', icon: Zap },
  { id: 'timeManagement', name: 'Time Management', desc: 'Prioritising milestones & deadlines', icon: Compass },
  { id: 'criticalThinking', name: 'Critical Thinking', desc: 'Objective research & logical deduction', icon: Eye },
  { id: 'creativity', name: 'Creativity', desc: 'Out-of-the-box design & ideation', icon: Heart },
];

const getRatingLabel = (val) => ['','Novice','Learner','Competent','Proficient','Master'][val] || '';

export default function Step4SoftSkills({ onNext, onBack }) {
  const { state, updateStepData } = useProfile();
  const [selectedSkills, setSelectedSkills] = useState(state.softSkills || {});

  const toggleSkill = (id) => {
    setSelectedSkills(prev => {
      const updated = { ...prev };
      if (updated[id] !== undefined) delete updated[id];
      else updated[id] = 3;
      return updated;
    });
  };

  const handleRating = (id, val) => {
    setSelectedSkills(prev => ({ ...prev, [id]: parseInt(val) }));
  };

  const handleNext = () => {
    updateStepData('softSkills', selectedSkills);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#F1F0FF] flex items-center justify-center gap-2">
          <Brain className="text-[#7C3AED] w-6 h-6 animate-pulse" /> Soft Skills
        </h2>
        <p className="text-[#6B7280] text-sm">Select any soft skills and rate your level (optional)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
        {SOFT_SKILLS_LIST.map(skill => {
          const Icon = skill.icon;
          const isSelected = selectedSkills[skill.id] !== undefined;
          const rating = selectedSkills[skill.id] || 3;
          return (
            <div key={skill.id} onClick={() => toggleSkill(skill.id)}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected ? 'bg-[#7C3AED]/10 border-[#7C3AED]' : 'bg-[#12121A]/80 border-[#7C3AED]/10 hover:border-[#7C3AED]/30'
              }`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#7C3AED]/20 text-[#A78BFA]' : 'bg-[#1A1A24] text-[#6B7280]'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#F1F0FF]">{skill.name}</h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">{skill.desc}</p>
                </div>
              </div>
              {isSelected && (
                <div className="mt-4 pt-3 border-t border-[#7C3AED]/10 space-y-2" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#A78BFA] font-semibold">Proficiency</span>
                    <span className="text-[#06B6D4] font-semibold">{getRatingLabel(rating)}</span>
                  </div>
                  <input type="range" min="1" max="5" value={rating}
                    onChange={e => handleRating(skill.id, e.target.value)}
                    className="w-full h-1 bg-[#1A1A24] rounded-lg appearance-none cursor-pointer accent-[#06B6D4]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="px-6 py-2.5 rounded-lg font-semibold bg-[#12121A] border border-[#7C3AED]/20 text-[#A78BFA] hover:bg-[#7C3AED]/10 transition-all cursor-pointer">← Back</button>
        <button type="button" onClick={handleNext} className="px-6 py-2.5 rounded-lg font-semibold bg-[#7C3AED] hover:bg-[#A78BFA] text-[#F1F0FF] shadow-lg transition-all cursor-pointer">Next →</button>
      </div>
    </div>
  );
}
