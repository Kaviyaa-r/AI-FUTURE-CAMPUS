import React, { useState } from 'react';
import { useProfile } from '../../../context/useProfileStore';
import { GraduationCap, Award, Percent, Hash } from 'lucide-react';

export default function Step2Academics({ onNext, onBack }) {
  const { state, updateStepData } = useProfile();
  const [form, setForm] = useState({
    cgpaType: state.academics.cgpaType || 'cgpa',
    cgpaValue: state.academics.cgpaValue || '',
    major: state.academics.major || '',
    achievements: state.academics.achievements || '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = () => {
    updateStepData('academics', form);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#F1F0FF] flex items-center justify-center gap-2">
          <GraduationCap className="text-[#7C3AED] w-6 h-6 animate-pulse" /> Academic Details
        </h2>
        <p className="text-[#6B7280] text-sm">Share your academic performance and specialisation</p>
      </div>

      <div className="space-y-5">
        {/* Toggle */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-[#A78BFA]">Score Type</label>
          <div className="flex gap-4">
            <button type="button" onClick={() => setForm({ ...form, cgpaType: 'cgpa' })}
              className={`flex-1 py-2.5 rounded-lg border font-semibold flex items-center justify-center gap-2 transition-all ${
                form.cgpaType === 'cgpa' ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-[#A78BFA]' : 'bg-[#12121A] border-[#7C3AED]/10 text-[#6B7280] hover:border-[#7C3AED]/35'
              }`}>
              <Hash className="w-4 h-4" /> CGPA (0–10)
            </button>
            <button type="button" onClick={() => setForm({ ...form, cgpaType: 'percent' })}
              className={`flex-1 py-2.5 rounded-lg border font-semibold flex items-center justify-center gap-2 transition-all ${
                form.cgpaType === 'percent' ? 'bg-[#06B6D4]/20 border-[#06B6D4] text-[#67E8F9]' : 'bg-[#12121A] border-[#7C3AED]/10 text-[#6B7280] hover:border-[#7C3AED]/35'
              }`}>
              <Percent className="w-4 h-4" /> Percentage (%)
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#A78BFA]">
            Score ({form.cgpaType === 'cgpa' ? '0 – 10' : '0% – 100%'})
          </label>
          <input type="number" name="cgpaValue" value={form.cgpaValue} onChange={handleChange}
            step="0.01" placeholder={form.cgpaType === 'cgpa' ? 'e.g. 8.75' : 'e.g. 88.50'}
            className="w-full bg-[#12121A]/80 border border-[#7C3AED]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 text-[#F1F0FF] transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#A78BFA]">Major / Specialisation</label>
          <input name="major" value={form.major} onChange={handleChange} placeholder="e.g. Data Science, Software Engineering"
            className="w-full bg-[#12121A]/80 border border-[#7C3AED]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 text-[#F1F0FF] transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#A78BFA] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#7C3AED]" /> Key Achievements <span className="text-[#6B7280] font-normal">(Optional)</span>
          </label>
          <textarea name="achievements" value={form.achievements} onChange={handleChange} rows={3}
            placeholder="e.g. Department Topper, Hackathon Winner..."
            className="w-full bg-[#12121A]/80 border border-[#7C3AED]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 text-[#F1F0FF] transition-all resize-none" />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="px-6 py-2.5 rounded-lg font-semibold bg-[#12121A] border border-[#7C3AED]/20 text-[#A78BFA] hover:bg-[#7C3AED]/10 transition-all duration-300 cursor-pointer">← Back</button>
        <button type="button" onClick={handleNext} className="px-6 py-2.5 rounded-lg font-semibold bg-[#7C3AED] hover:bg-[#A78BFA] text-[#F1F0FF] shadow-lg transition-all duration-300 cursor-pointer">Next →</button>
      </div>
    </div>
  );
}
