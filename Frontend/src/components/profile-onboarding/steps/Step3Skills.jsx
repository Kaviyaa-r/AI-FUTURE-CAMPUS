import React, { useState } from 'react';
import { useProfile } from '../../../context/useProfileStore';
import { Cpu, Plus, X } from 'lucide-react';

const SUGGESTIONS = ['Python','JavaScript','React','SQL','Node.js','Java','C++','Data Analysis','Machine Learning','HTML/CSS','Git','Pandas','NumPy','Tableau'];

export default function Step3Skills({ onNext, onBack }) {
  const { state, setArrayData } = useProfile();
  const [skills, setSkills] = useState(state.skills || []);
  const [inputVal, setInputVal] = useState('');

  const remainingSuggestions = SUGGESTIONS.filter(s => !skills.some(sk => sk.name.toLowerCase() === s.toLowerCase()));

  const addSkill = (name) => {
    const trimmed = name.trim();
    if (!trimmed || skills.some(s => s.name.toLowerCase() === trimmed.toLowerCase())) return;
    setSkills([...skills, { name: trimmed, level: 'Intermediate' }]);
    setInputVal('');
  };

  const removeSkill = (i) => setSkills(skills.filter((_, idx) => idx !== i));

  const cycleLevel = (index) => {
    const updated = [...skills];
    const map = { Beginner: 'Intermediate', Intermediate: 'Advanced', Advanced: 'Beginner' };
    updated[index].level = map[updated[index].level];
    setSkills(updated);
  };

  const handleNext = () => {
    setArrayData('skills', skills);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#F1F0FF] flex items-center justify-center gap-2">
          <Cpu className="text-[#7C3AED] w-6 h-6 animate-pulse" /> Technical Skills
        </h2>
        <p className="text-[#6B7280] text-sm">Add your skills — click a chip to cycle its level</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input value={inputVal} onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(inputVal); }}}
            placeholder="Type skill name & press Enter..."
            className="flex-1 bg-[#12121A]/80 border border-[#7C3AED]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#06B6D4] text-[#F1F0FF] transition-all" />
          <button type="button" onClick={() => addSkill(inputVal)}
            className="px-4 py-2 bg-[#7C3AED] text-[#F1F0FF] rounded-lg hover:bg-[#A78BFA] transition-all flex items-center gap-1 font-semibold cursor-pointer">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="flex flex-wrap gap-3 p-3 bg-[#12121A]/50 border border-[#7C3AED]/10 rounded-lg min-h-[80px]">
          {skills.length === 0 ? <p className="text-[#6B7280] text-sm m-auto">No skills added yet — or skip and continue</p> : skills.map((skill, index) => {
            const colors = { Beginner: 'border-[#6B7280]/50 bg-[#1A1A24]', Intermediate: 'border-[#06B6D4]/50 bg-[#06B6D4]/10', Advanced: 'border-[#7C3AED]/50 bg-[#7C3AED]/10' };
            const badgeColors = { Beginner: 'bg-[#6B7280]/20 text-[#6B7280]', Intermediate: 'bg-[#06B6D4]/20 text-[#67E8F9]', Advanced: 'bg-[#7C3AED]/20 text-[#A78BFA]' };
            return (
              <div key={index} onClick={() => cycleLevel(index)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all ${colors[skill.level]}`}>
                <span className="text-sm font-medium text-[#F1F0FF] select-none">{skill.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${badgeColors[skill.level]}`}>{skill.level}</span>
                <button type="button" onClick={e => { e.stopPropagation(); removeSkill(index); }}
                  className="p-0.5 hover:text-[#EF4444] text-[#6B7280] rounded-full transition-colors cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {remainingSuggestions.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#6B7280] tracking-wider uppercase">Quick Add</label>
            <div className="flex flex-wrap gap-2">
              {remainingSuggestions.map((s, i) => (
                <button key={i} type="button" onClick={() => addSkill(s)}
                  className="px-3 py-1 rounded-full bg-[#12121A]/60 border border-[#7C3AED]/10 text-[#6B7280] hover:text-[#A78BFA] hover:border-[#7C3AED]/40 text-xs transition-all flex items-center gap-1 cursor-pointer">
                  <Plus className="w-3 h-3" /> {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="px-6 py-2.5 rounded-lg font-semibold bg-[#12121A] border border-[#7C3AED]/20 text-[#A78BFA] hover:bg-[#7C3AED]/10 transition-all cursor-pointer">← Back</button>
        <button type="button" onClick={handleNext} className="px-6 py-2.5 rounded-lg font-semibold bg-[#7C3AED] hover:bg-[#A78BFA] text-[#F1F0FF] shadow-lg transition-all cursor-pointer">Next →</button>
      </div>
    </div>
  );
}
