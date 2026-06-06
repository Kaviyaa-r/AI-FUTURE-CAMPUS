import React, { useState } from 'react';
import { useProfile } from '../../../context/useProfileStore';
import { FolderGit, Plus, Trash2, GitBranch } from 'lucide-react';

export default function Step6Projects({ onNext, onBack }) {
  const { state, setArrayData } = useProfile();
  const [projects, setProjects] = useState(state.projects || []);
  const [title, setTitle] = useState('');
  const [stack, setStack] = useState('');
  const [desc, setDesc] = useState('');
  const [github, setGithub] = useState('');
  const [formError, setFormError] = useState('');

  const addProject = () => {
    if (projects.length >= 5) { setFormError('Maximum 5 projects allowed.'); return; }
    if (!title.trim()) { setFormError('Project name is required.'); return; }
    setFormError('');
    setProjects([...projects, {
      id: Date.now().toString(),
      title: title.trim(),
      stack: stack.split(',').map(s => s.trim()).filter(Boolean),
      desc: desc.trim(),
      github: github.trim(),
    }]);
    setTitle(''); setStack(''); setDesc(''); setGithub('');
  };

  const removeProject = (id) => setProjects(projects.filter(p => p.id !== id));

  const handleNext = () => {
    setArrayData('projects', projects);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#F1F0FF] flex items-center justify-center gap-2">
          <FolderGit className="text-[#7C3AED] w-6 h-6 animate-pulse" /> Projects
        </h2>
        <p className="text-[#6B7280] text-sm">Add up to 5 projects (optional — click Next to skip)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[380px] overflow-y-auto pr-1">
        {/* Form */}
        <div className="space-y-3 p-4 rounded-xl border border-[#7C3AED]/15 bg-[#12121A]/40 h-fit">
          <div className="flex justify-between items-center border-b border-[#7C3AED]/10 pb-2">
            <h3 className="text-sm font-semibold text-[#A78BFA]">Add Project</h3>
            <span className="text-xs text-[#6B7280] font-mono">{projects.length}/5</span>
          </div>

          {[
            { label: 'Project Name *', value: title, setter: setTitle, placeholder: 'e.g. SkillBridge Platform' },
            { label: 'Tech Stack (comma separated)', value: stack, setter: setStack, placeholder: 'e.g. React, Node.js, MongoDB' },
            { label: 'GitHub URL (optional)', value: github, setter: setGithub, placeholder: 'https://github.com/user/repo' },
          ].map(({ label, value, setter, placeholder }) => (
            <div key={label}>
              <label className="text-xs font-semibold text-[#6B7280] block mb-1">{label}</label>
              <input value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
                disabled={projects.length >= 5}
                className="w-full bg-[#12121A] border border-[#7C3AED]/10 rounded-lg py-1.5 px-3 focus:outline-none focus:border-[#06B6D4] text-sm text-[#F1F0FF] disabled:opacity-50" />
            </div>
          ))}

          <div>
            <label className="text-xs font-semibold text-[#6B7280] block mb-1">Short Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2}
              disabled={projects.length >= 5}
              placeholder="What did this project do?"
              className="w-full bg-[#12121A] border border-[#7C3AED]/10 rounded-lg py-1.5 px-3 focus:outline-none focus:border-[#06B6D4] text-sm text-[#F1F0FF] resize-none disabled:opacity-50" />
          </div>

          {formError && <p className="text-[#EF4444] text-xs">{formError}</p>}

          <button type="button" onClick={addProject} disabled={projects.length >= 5}
            className={`w-full py-2 font-semibold rounded-lg text-sm flex items-center justify-center gap-1 transition-all ${
              projects.length >= 5 ? 'bg-[#12121A] text-[#6B7280] cursor-not-allowed' : 'bg-[#06B6D4]/20 border border-[#06B6D4]/40 hover:bg-[#06B6D4]/30 text-[#67E8F9] cursor-pointer'
            }`}>
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#A78BFA] border-b border-[#7C3AED]/10 pb-2">Added Projects</h3>
          {projects.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center border border-dashed border-[#7C3AED]/15 rounded-xl">
              <p className="text-[#6B7280] text-xs">No projects yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {projects.map(p => (
                <div key={p.id} className="p-4 rounded-xl border border-[#7C3AED]/25 bg-[#12121A]/80 flex justify-between items-start gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-[#F1F0FF] truncate">{p.title}</h4>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer"
                          className="text-[#67E8F9] hover:text-[#06B6D4] transition-colors flex items-center gap-0.5 text-xs flex-shrink-0">
                          <GitBranch className="w-3.5 h-3.5" /> Repo
                        </a>
                      )}
                    </div>
                    {p.desc && <p className="text-xs text-[#A78BFA] line-clamp-2">{p.desc}</p>}
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#A78BFA]">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <button type="button" onClick={() => removeProject(p.id)} className="text-[#6B7280] hover:text-[#EF4444] transition-colors cursor-pointer flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="px-6 py-2.5 rounded-lg font-semibold bg-[#12121A] border border-[#7C3AED]/20 text-[#A78BFA] hover:bg-[#7C3AED]/10 transition-all cursor-pointer">← Back</button>
        <button type="button" onClick={handleNext} className="px-6 py-2.5 rounded-lg font-semibold bg-[#7C3AED] hover:bg-[#A78BFA] text-[#F1F0FF] shadow-lg transition-all cursor-pointer">Next →</button>
      </div>
    </div>
  );
}
