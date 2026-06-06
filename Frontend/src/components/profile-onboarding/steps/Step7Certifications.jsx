import React, { useState } from 'react';
import { useProfile } from '../../../context/useProfileStore';
import { Award, Plus, Trash2, Calendar, AlertTriangle } from 'lucide-react';

const PLATFORMS = ['Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'AWS', 'Google', 'Microsoft', 'Oracle', 'Other'];

export default function Step7Certifications({ onNext, onBack }) {
  const { state, setArrayData } = useProfile();
  const [certs, setCerts] = useState(state.certifications || []);

  // Form states
  const [platform, setPlatform] = useState('Coursera');
  const [name, setName] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [formError, setFormError] = useState('');

  const addCert = () => {
    if (!name.trim()) {
      setFormError('Certification Name is required.');
      return;
    }
    setFormError('');

    const newCert = {
      id: Date.now().toString(),
      platform,
      name: name.trim(),
      year,
    };

    setCerts([...certs, newCert]);
    setName('');
  };

  const removeCert = (id) => {
    setCerts(certs.filter((c) => c.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setArrayData('certifications', certs);
    onNext();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => (currentYear - i).toString());

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-glow-purple text-text flex items-center justify-center gap-2">
          <Award className="text-purple w-6 h-6 animate-pulse" /> Verified Credentials
        </h2>
        <p className="text-muted text-sm">Add certifications and platform licenses you hold (Optional)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[380px] overflow-y-auto pr-1">
        {/* Certificate Form */}
        <div className="space-y-4 p-4 rounded-xl border border-purple/15 bg-[#12121A]/40 h-fit">
          <h3 className="text-sm font-semibold text-purpleLight border-b border-purple/10 pb-2">Add Certificate</h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Platform Issuer</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-[#12121A] border border-purple/10 rounded-lg py-1.5 px-3 focus:outline-none focus:border-teal text-sm text-text appearance-none"
              >
                {PLATFORMS.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Certification Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Machine Learning Specialization"
                className="w-full bg-[#12121A] border border-purple/10 rounded-lg py-1.5 px-3 focus:outline-none focus:border-teal text-sm text-text"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Year Earned</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-[#12121A] border border-purple/10 rounded-lg py-1.5 px-3 focus:outline-none focus:border-teal text-sm text-text appearance-none"
              >
                {years.map((y, i) => (
                  <option key={i} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {formError && (
            <p className="text-error text-xs flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> {formError}
            </p>
          )}

          <button
            type="button"
            onClick={addCert}
            className="w-full py-2 bg-teal/20 border border-teal/40 hover:bg-teal/30 text-tealLight font-semibold rounded-lg text-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Certificate
          </button>
        </div>

        {/* Certificate List */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-purpleLight border-b border-purple/10 pb-2">Active Credentials ({certs.length})</h3>
          {certs.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center border border-dashed border-purple/15 rounded-xl">
              <p className="text-muted text-xs">No certificates listed yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {certs.map((c) => (
                <div key={c.id} className="p-4 rounded-xl border border-purple/25 bg-[#12121A]/80 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-text">{c.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-teal/10 border border-teal/20 text-tealLight font-semibold">
                        {c.platform}
                      </span>
                      <span className="text-[10px] text-muted flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {c.year}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCert(c.id)}
                    className="text-muted hover:text-error transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
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
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-lg font-semibold bg-purple hover:bg-purpleLight text-text shadow-glass-purple hover:shadow-purple/30 cursor-pointer transition-all duration-300"
        >
          Next Matrix
        </button>
      </div>
    </div>
  );
}
