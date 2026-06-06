import React, { useState } from 'react';
import { useProfile } from '../../../context/useProfileStore';
import { Settings, Video, BookOpen, Terminal, Users, AlertTriangle } from 'lucide-react';

const FORMATS = [
  { id: 'Video', label: 'Video Tutorials', desc: 'Bite-sized visual lectures & demos', icon: Video },
  { id: 'Reading', label: 'Documentation / Articles', desc: 'Sleek read-throughs, manuals & codebases', icon: BookOpen },
  { id: 'Hands-on', label: 'Interactive Coding Labs', desc: 'Direct browser execution & local sandboxes', icon: Terminal },
  { id: 'Live', label: 'Live Mentorship Sessions', desc: 'Synchronous reviews, streams & cohort QA', icon: Users },
];

export default function Step9Preferences({ onNext, onBack }) {
  const { state, updateStepData } = useProfile();

  const [selectedFormats, setSelectedFormats] = useState(state.preferences.formats || []);
  const [hoursPerWeek, setHoursPerWeek] = useState(state.preferences.hoursPerWeek || 15);
  const [error, setError] = useState('');

  const toggleFormat = (id) => {
    if (selectedFormats.includes(id)) {
      setSelectedFormats(selectedFormats.filter((f) => f !== id));
    } else {
      setSelectedFormats([...selectedFormats, id]);
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFormats.length === 0) {
      setError('Please select at least one study format configuration.');
      return;
    }

    updateStepData('preferences', {
      formats: selectedFormats,
      hoursPerWeek,
    });
    onNext();
  };

  const getPaceLabel = (hrs) => {
    if (hrs <= 5) return 'Casual Commits (1-5 hrs/wk)';
    if (hrs <= 15) return 'Active Integration (6-15 hrs/wk)';
    if (hrs <= 30) return 'Intense Study Core (16-30 hrs/wk)';
    return 'Full Immersion Bootcamp (31-40 hrs/wk)';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-glow-purple text-text flex items-center justify-center gap-2">
          <Settings className="text-purple w-6 h-6 animate-pulse" /> Training Protocols
        </h2>
        <p className="text-muted text-sm">Tune your educational absorption format and weekly runtime commitment</p>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/20 text-error px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm justify-center">
          <AlertTriangle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Format Multi-Select Grid */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-purpleLight block text-center md:text-left">
          Preferred Learning Formats (Multi-select)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FORMATS.map((f) => {
            const Icon = f.icon;
            const isSelected = selectedFormats.includes(f.id);

            return (
              <div
                key={f.id}
                onClick={() => toggleFormat(f.id)}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex gap-4 items-center ${
                  isSelected
                    ? 'bg-purple/15 border-purple shadow-glass-purple'
                    : 'bg-[#12121A]/80 border-purple/10 hover:border-purple/35'
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    isSelected ? 'bg-purple/35 text-purpleLight' : 'bg-[#1A1A24] text-muted'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text">{f.label}</h3>
                  <p className="text-xs text-muted mt-0.5">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commitment Hours Slider */}
      <div className="space-y-4 p-4 rounded-xl bg-[#12121A]/50 border border-purple/10">
        <div className="flex justify-between items-center text-xs md:text-sm">
          <span className="text-purpleLight font-semibold">Weekly Study Commitment</span>
          <span className="text-teal font-semibold">{hoursPerWeek} Hours/Week</span>
        </div>
        
        <input
          type="range"
          min="1"
          max="40"
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
          className="w-full h-1.5 bg-[#1A1A24] rounded-lg appearance-none cursor-pointer accent-teal"
        />

        <div className="text-center text-xs text-muted font-medium pt-1">
          Pace Profile: <span className="text-tealLight">{getPaceLabel(hoursPerWeek)}</span>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg font-semibold bg-[#12121A] border border-purple/20 text-purpleLight hover:bg-purple/10 hover:border-purpleLight transition-all duration-300"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg font-semibold bg-purple hover:bg-purpleLight text-text shadow-glass-purple hover:shadow-purple/30 cursor-pointer transition-all duration-300"
        >
          Compile Profile
        </button>
      </div>
    </form>
  );
}
