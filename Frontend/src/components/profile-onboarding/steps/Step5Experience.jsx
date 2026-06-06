import React, { useState } from 'react';
import { useProfile } from '../../../context/useProfileStore';
import { Briefcase, Plus, Trash2, Calendar } from 'lucide-react';

export default function Step5Experience({ onNext, onBack }) {
  const { state, updateStepData } = useProfile();
  const [hasExperience, setHasExperience] = useState(state.experience.hasExperience);
  const [list, setList] = useState(state.experience.list || []);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [duration, setDuration] = useState('');
  const [work, setWork] = useState('');

  const addExperience = () => {
    if (!role.trim() || !company.trim()) return;
    setList([...list, { id: Date.now().toString(), role: role.trim(), company: company.trim(), duration: duration.trim(), work: work.trim() }]);
    setRole(''); setCompany(''); setDuration(''); setWork('');
  };

  const handleNext = () => {
    updateStepData('experience', { hasExperience, list: hasExperience ? list : [] });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#F1F0FF] flex items-center justify-center gap-2">
          <Briefcase className="text-[#7C3AED] w-6 h-6 animate-pulse" /> Experience
        </h2>
        <p className="text-[#6B7280] text-sm">Add internships or jobs (or toggle off if you're a fresher)</p>
      </div>

      {/* Fresher Toggle */}
      <div className="flex items-center justify-between p-4 bg-[#12121A]/80 border border-[#7C3AED]/10 rounded-xl">
        <div>
          <h3 className="text-sm font-semibold text-[#F1F0FF]">I have work experience</h3>
          <p className="text-xs text-[#6B7280] mt-0.5">Toggle off if you're a fresher</p>
        </div>
        <button type="button" onClick={() => setHasExperience(!hasExperience)}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none cursor-pointer ${hasExperience ? 'bg-[#7C3AED]' : 'bg-[#1A1A24] border border-[#7C3AED]/20'}`}>
          <div className={`w-4 h-4 rounded-full bg-[#F1F0FF] transition-transform duration-300 ${hasExperience ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>

      {hasExperience ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[360px] overflow-y-auto pr-1">
          <div className="space-y-3 p-4 rounded-xl border border-[#7C3AED]/15 bg-[#12121A]/40 h-fit">
            <h3 className="text-sm font-semibold text-[#A78BFA] border-b border-[#7C3AED]/10 pb-2">Add Experience</h3>
            {[
              { label: 'Job Role / Title *', value: role, setter: setRole, placeholder: 'e.g. Frontend Intern' },
              { label: 'Company *', value: company, setter: setCompany, placeholder: 'e.g. Google' },
              { label: 'Duration', value: duration, setter: setDuration, placeholder: 'e.g. May 2025 – Present' },
            ].map(({ label, value, setter, placeholder }) => (
              <div key={label}>
                <label className="text-xs font-semibold text-[#6B7280] block mb-1">{label}</label>
                <input value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
                  className="w-full bg-[#12121A] border border-[#7C3AED]/10 rounded-lg py-1.5 px-3 focus:outline-none focus:border-[#06B6D4] text-sm text-[#F1F0FF]" />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-[#6B7280] block mb-1">Work Done</label>
              <textarea value={work} onChange={e => setWork(e.target.value)} rows={2}
                placeholder="Key responsibilities or achievements..."
                className="w-full bg-[#12121A] border border-[#7C3AED]/10 rounded-lg py-1.5 px-3 focus:outline-none focus:border-[#06B6D4] text-sm text-[#F1F0FF] resize-none" />
            </div>
            <button type="button" onClick={addExperience}
              className="w-full py-2 bg-[#06B6D4]/20 border border-[#06B6D4]/40 hover:bg-[#06B6D4]/30 text-[#67E8F9] font-semibold rounded-lg text-sm transition-all flex items-center justify-center gap-1 cursor-pointer">
              <Plus className="w-4 h-4" /> Add Record
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#A78BFA] border-b border-[#7C3AED]/10 pb-2">Added ({list.length})</h3>
            {list.length === 0 ? (
              <div className="h-[180px] flex items-center justify-center border border-dashed border-[#7C3AED]/15 rounded-xl">
                <p className="text-[#6B7280] text-xs">No records yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                {list.map(item => (
                  <div key={item.id} className="p-4 rounded-xl border border-[#7C3AED]/25 bg-[#12121A]/80 flex justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#F1F0FF]">{item.role}</h4>
                      <p className="text-xs text-[#06B6D4] font-medium">{item.company}</p>
                      {item.duration && <p className="text-[10px] text-[#6B7280] flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.duration}</p>}
                      {item.work && <p className="text-xs text-[#A78BFA]">{item.work}</p>}
                    </div>
                    <button type="button" onClick={() => setList(list.filter(i => i.id !== item.id))}
                      className="text-[#6B7280] hover:text-[#EF4444] transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-[#06B6D4]/20 rounded-xl bg-[#06B6D4]/5">
          <Briefcase className="w-12 h-12 text-[#06B6D4] animate-pulse mb-3" />
          <h3 className="text-lg font-semibold text-[#67E8F9]">Fresher Mode</h3>
          <p className="text-[#6B7280] text-xs text-center max-w-sm mt-1">No experience? No problem — click Next to continue.</p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="px-6 py-2.5 rounded-lg font-semibold bg-[#12121A] border border-[#7C3AED]/20 text-[#A78BFA] hover:bg-[#7C3AED]/10 transition-all cursor-pointer">← Back</button>
        <button type="button" onClick={handleNext} className="px-6 py-2.5 rounded-lg font-semibold bg-[#7C3AED] hover:bg-[#A78BFA] text-[#F1F0FF] shadow-lg transition-all cursor-pointer">Next →</button>
      </div>
    </div>
  );
}
