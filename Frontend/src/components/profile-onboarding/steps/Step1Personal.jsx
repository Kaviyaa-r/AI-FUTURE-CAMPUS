import React, { useState } from 'react';
import { useProfile } from '../../../context/useProfileStore';
import { User, BookOpen, Calendar, School, MapPin, Sparkles } from 'lucide-react';

const PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
];

export default function Step1Personal({ onNext }) {
  const { state, updateStepData } = useProfile();
  const [form, setForm] = useState({
    name: state.personal.name || '',
    course: state.personal.course || '',
    year: state.personal.year || '1st Year',
    college: state.personal.college || '',
    city: state.personal.city || '',
  });
  const [selectedAvatar, setSelectedAvatar] = useState(state.personal.photo || PRESETS[0]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = () => {
    updateStepData('personal', { ...form, photo: selectedAvatar });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#F1F0FF] flex items-center justify-center gap-2">
          <Sparkles className="text-[#7C3AED] w-6 h-6 animate-pulse" /> Personal Details
        </h2>
        <p className="text-[#6B7280] text-sm">Set up your basic student identity</p>
      </div>

      {/* Avatar Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#A78BFA]">Choose Avatar</label>
        <div className="flex flex-wrap items-center gap-4 justify-center py-2">
          {PRESETS.map((url, i) => (
            <button key={i} type="button" onClick={() => setSelectedAvatar(url)}
              className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                selectedAvatar === url ? 'border-[#06B6D4] ring-2 ring-[#06B6D4]/30 scale-110' : 'border-[#7C3AED]/30 hover:border-[#A78BFA]'
              }`}>
              <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#A78BFA] flex items-center gap-2">
            <User className="w-4 h-4 text-[#7C3AED]" /> Full Name
          </label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Alex Chen"
            className="w-full bg-[#12121A]/80 border border-[#7C3AED]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 text-[#F1F0FF] transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#A78BFA] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#7C3AED]" /> Course / Degree
          </label>
          <input name="course" value={form.course} onChange={handleChange} placeholder="e.g. B.Tech Computer Science"
            className="w-full bg-[#12121A]/80 border border-[#7C3AED]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 text-[#F1F0FF] transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#A78BFA] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#7C3AED]" /> Year of Study
          </label>
          <select name="year" value={form.year} onChange={handleChange}
            className="w-full bg-[#12121A]/80 border border-[#7C3AED]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#06B6D4] text-[#F1F0FF] transition-all appearance-none">
            {['1st Year','2nd Year','3rd Year','4th Year','5th Year'].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#A78BFA] flex items-center gap-2">
            <School className="w-4 h-4 text-[#7C3AED]" /> College / University
          </label>
          <input name="college" value={form.college} onChange={handleChange} placeholder="e.g. Stanford University"
            className="w-full bg-[#12121A]/80 border border-[#7C3AED]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 text-[#F1F0FF] transition-all" />
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-[#A78BFA] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#7C3AED]" /> City / Location
          </label>
          <input name="city" value={form.city} onChange={handleChange} placeholder="e.g. San Francisco, CA"
            className="w-full bg-[#12121A]/80 border border-[#7C3AED]/20 rounded-lg py-2 px-3 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/30 text-[#F1F0FF] transition-all" />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button type="button" onClick={handleNext}
          className="px-6 py-2.5 rounded-lg font-semibold bg-[#7C3AED] hover:bg-[#A78BFA] text-[#F1F0FF] shadow-lg transition-all duration-300 cursor-pointer">
          Next →
        </button>
      </div>
    </div>
  );
}
