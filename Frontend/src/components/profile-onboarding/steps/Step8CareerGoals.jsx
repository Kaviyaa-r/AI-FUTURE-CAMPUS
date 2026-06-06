import React, { useState } from 'react';
import { useProfile } from '../../../context/useProfileStore';
import { Target, Plus, X, AlertTriangle } from 'lucide-react';

const SUGGESTED_ROLES = [
  'Data Scientist', 'Frontend Engineer', 'Backend Developer', 
  'Full Stack Developer', 'Product Manager', 'UI/UX Designer', 
  'DevOps Engineer', 'Mobile App Developer'
];

const INDUSTRIES = ['AI / ML', 'Fintech', 'SaaS', 'E-commerce', 'Edtech', 'Cybersecurity', 'Healthtech', 'Gaming'];

export default function Step8CareerGoals({ onNext, onBack }) {
  const { state, updateStepData } = useProfile();

  const [dreamRole, setDreamRole] = useState(state.careerGoals.dreamRole || '');
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState(state.careerGoals.industries || []);
  
  const [companies, setCompanies] = useState(state.careerGoals.companies || []);
  const [companyInput, setCompanyInput] = useState('');
  
  const [workPreference, setWorkPreference] = useState(state.careerGoals.workPreference || 'Remote');
  const [timeline, setTimeline] = useState(state.careerGoals.timeline || 'Immediate (0-3 months)');
  
  const [error, setError] = useState('');

  const handleAddCompany = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCompany();
    }
  };

  const addCompany = () => {
    const trimmed = companyInput.trim();
    if (!trimmed) return;
    if (companies.includes(trimmed)) return;
    setCompanies([...companies, trimmed]);
    setCompanyInput('');
    setError('');
  };

  const removeCompany = (name) => {
    setCompanies(companies.filter((c) => c !== name));
  };

  const toggleIndustry = (ind) => {
    if (selectedIndustries.includes(ind)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== ind));
    } else {
      setSelectedIndustries([...selectedIndustries, ind]);
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dreamRole.trim()) {
      setError('Please input or select your dream career role.');
      return;
    }
    if (selectedIndustries.length === 0) {
      setError('Please select at least one target industry.');
      return;
    }
    if (companies.length === 0) {
      setError('Please add at least one target company.');
      return;
    }

    // Also write to antigravity_career_goal in localStorage as required for Module 2!
    localStorage.setItem('antigravity_career_goal', dreamRole.trim());

    updateStepData('careerGoals', {
      dreamRole: dreamRole.trim(),
      industries: selectedIndustries,
      companies,
      workPreference,
      timeline,
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-glow-purple text-text flex items-center justify-center gap-2">
          <Target className="text-purple w-6 h-6 animate-pulse" /> Telemetry Targets
        </h2>
        <p className="text-muted text-sm">Target your dream work environment, sectors, and milestones</p>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/20 text-error px-4 py-2 rounded-lg flex items-center gap-2 text-xs justify-center">
          <AlertTriangle className="w-4 h-4" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[385px] overflow-y-auto pr-1">
        {/* Dream Role Input with Suggestions */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-purpleLight">Dream Role</label>
          <input
            type="text"
            value={dreamRole}
            onChange={(e) => {
              setDreamRole(e.target.value);
              setShowRoleSuggestions(true);
              setError('');
            }}
            onFocus={() => setShowRoleSuggestions(true)}
            onBlur={() => setTimeout(() => setShowRoleSuggestions(false), 200)}
            placeholder="e.g. Data Scientist"
            className="w-full bg-[#12121A]/80 border border-purple/20 rounded-lg py-2 px-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 text-text transition-all text-sm"
          />
          {showRoleSuggestions && (
            <div className="absolute left-0 right-0 mt-1 bg-[#12121A] border border-purple/20 rounded-lg shadow-xl z-20 max-h-[160px] overflow-y-auto">
              {SUGGESTED_ROLES.filter((r) => r.toLowerCase().includes(dreamRole.toLowerCase())).map((role, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setDreamRole(role);
                    setShowRoleSuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-text hover:bg-purple/25 transition-colors cursor-pointer"
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Timeline Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-purpleLight">Hiring Timeline</label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full bg-[#12121A]/80 border border-purple/20 rounded-lg py-2 px-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 text-text transition-all text-sm appearance-none"
          >
            <option value="Immediate (0-3 months)">Immediate (0-3 months)</option>
            <option value="Near-term (3-6 months)">Near-term (3-6 months)</option>
            <option value="Graduate Cycle (6-12 months)">Graduate Cycle (6-12 months)</option>
            <option value="Exploratory (12+ months)">Exploratory (12+ months)</option>
          </select>
        </div>

        {/* Work Location Toggle */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-purpleLight">Preferred Location Matrix</label>
          <div className="flex bg-[#12121A]/50 border border-purple/10 rounded-lg p-1">
            {['Remote', 'Hybrid', 'Onsite'].map((pref) => (
              <button
                key={pref}
                type="button"
                onClick={() => setWorkPreference(pref)}
                className={`flex-1 py-1.5 rounded font-semibold text-xs transition-all ${
                  workPreference === pref
                    ? 'bg-purple/20 border border-purple/40 text-purpleLight shadow-glass-purple'
                    : 'text-muted hover:text-purpleLight'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        {/* Industry Multi-chip selection */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-purpleLight">Target Industries</label>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => {
              const isSelected = selectedIndustries.includes(ind);
              return (
                <button
                  key={ind}
                  type="button"
                  onClick={() => toggleIndustry(ind)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-teal/15 border-teal text-tealLight'
                      : 'bg-[#12121A]/60 border-purple/10 text-muted hover:border-purple/35'
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Companies tags */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-purpleLight">Target Companies</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={companyInput}
              onChange={(e) => setCompanyInput(e.target.value)}
              onKeyDown={handleAddCompany}
              placeholder="e.g. Netflix, Stripe (Press Enter)"
              className="flex-1 bg-[#12121A]/80 border border-purple/20 rounded-lg py-2 px-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 text-text transition-all text-sm"
            />
            <button
              type="button"
              onClick={addCompany}
              className="px-4 py-2 bg-purple text-text rounded-lg hover:bg-purpleLight transition-all flex items-center gap-1 font-semibold text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {companies.map((co) => (
              <span
                key={co}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#12121A] border border-purple/30 text-purpleLight text-xs"
              >
                {co}
                <button
                  type="button"
                  onClick={() => removeCompany(co)}
                  className="hover:text-error transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
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
          Next Matrix
        </button>
      </div>
    </form>
  );
}
