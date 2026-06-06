import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  CheckCircle,
  AlertOctagon,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Map,
  RefreshCw,
  BookOpen,
  Calendar,
  Sparkles,
} from 'lucide-react';

// Simple custom hook for count-up animation
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    const totalMiliseconds = duration;
    const stepTime = Math.max(Math.floor(totalMiliseconds / end), 25);

    const timer = setInterval(() => {
      start += Math.ceil(end / 40); // Count up in increments
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export default function GapDashboard({ careerGoal, onUpdateSkills }) {
  const [isNiceExpanded, setIsNiceExpanded] = useState(false);
  const [roadmapSkills, setRoadmapSkills] = useState([]);
  const [roadmapBuilt, setRoadmapBuilt] = useState(false);

  // Load from local storage
  const savedData = localStorage.getItem('antigravity_gap_analysis');
  const results = savedData
    ? JSON.parse(savedData)
    : {
        matchScore: 68,
        skillsHave: 4,
        skillsRequired: 12,
        gapCount: 8,
        radarData: [
          { subject: 'Programming', A: 85, B: 90, fullMark: 100 },
          { subject: 'Databases', A: 70, B: 85, fullMark: 100 },
          { subject: 'Analysis', A: 40, B: 85, fullMark: 100 },
          { subject: 'Visualization', A: 30, B: 80, fullMark: 100 },
          { subject: 'Soft Skills', A: 80, B: 75, fullMark: 100 },
          { subject: 'Engineering', A: 20, B: 70, fullMark: 100 },
        ],
        gaps: {
          critical: [
            { name: 'Pandas', domain: 'Data Analysis', jdPercent: 88, weeksToLearn: 3, level: 'Beginner' },
            { name: 'Tableau', domain: 'Visualization', jdPercent: 78, weeksToLearn: 2, level: 'Beginner' },
            { name: 'Advanced SQL', domain: 'Databases', jdPercent: 92, weeksToLearn: 4, level: 'Intermediate' },
            { name: 'NumPy', domain: 'Data Analysis', jdPercent: 82, weeksToLearn: 2, level: 'Beginner' },
          ],
          important: [
            { name: 'Power BI', domain: 'Visualization', jdPercent: 65, weeksToLearn: 3, level: 'Beginner' },
            { name: 'Statistics', domain: 'Data Science', jdPercent: 70, weeksToLearn: 6, level: 'Intermediate' },
            { name: 'Advanced Excel', domain: 'Tools', jdPercent: 60, weeksToLearn: 2, level: 'Intermediate' },
            { name: 'Data Storytelling', domain: 'Communication', jdPercent: 68, weeksToLearn: 3, level: 'Intermediate' },
          ],
          nice: [
            { name: 'R', domain: 'Data Analysis', jdPercent: 45, weeksToLearn: 4, level: 'Beginner' },
            { name: 'Spark', domain: 'Data Engineering', jdPercent: 48, weeksToLearn: 5, level: 'Beginner' },
          ],
        },
        matched: [
          { name: 'Python', domain: 'Programming', level: 'Advanced' },
          { name: 'MySQL', domain: 'Databases', level: 'Intermediate' },
          { name: 'Excel Basic', domain: 'Tools', level: 'Intermediate' },
          { name: 'Communication', domain: 'Soft Skills', level: 'Advanced' },
        ],
      };

  const countScore = useCountUp(results.matchScore);
  const countHave = useCountUp(results.skillsHave);
  const countReq = useCountUp(results.skillsRequired);
  const countGaps = useCountUp(results.gapCount);

  // Score coloring
  const getScoreColor = (score) => {
    if (score >= 75) return '#10B981'; // Green
    if (score >= 50) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const handleAddToRoadmap = (skillName) => {
    if (roadmapSkills.includes(skillName)) {
      setRoadmapSkills(roadmapSkills.filter((s) => s !== skillName));
    } else {
      setRoadmapSkills([...roadmapSkills, skillName]);
    }
  };

  const buildRoadmap = () => {
    setRoadmapBuilt(true);
    setTimeout(() => {
      setRoadmapBuilt(false);
      alert(
        `Custom training roadmap built successfully for: ${
          roadmapSkills.length > 0 ? roadmapSkills.join(', ') : 'All Gaps'
        }`
      );
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-6 relative">
      <div className="bg-glow-purple top-10 left-10" />
      <div className="bg-glow-teal bottom-10 right-10" />

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl glass-panel flex flex-col justify-between items-center text-center">
          <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Skills Have</span>
          <span className="text-3xl font-extrabold text-tealLight mt-1 font-mono">{countHave}</span>
          <span className="text-[10px] text-muted mt-1">Verified attributes</span>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl glass-panel flex flex-col justify-between items-center text-center">
          <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Skills Required</span>
          <span className="text-3xl font-extrabold text-purpleLight mt-1 font-mono">{countReq}</span>
          <span className="text-[10px] text-muted mt-1">Industry targets</span>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl glass-panel flex flex-col justify-between items-center text-center">
          <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Gaps Identified</span>
          <span className="text-3xl font-extrabold text-error mt-1 font-mono">{countGaps}</span>
          <span className="text-[10px] text-muted mt-1">Priority focus areas</span>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl glass-panel flex flex-col justify-between items-center text-center">
          <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Match Score</span>
          <span
            className="text-3xl font-extrabold mt-1 font-mono"
            style={{ color: getScoreColor(results.matchScore) }}
          >
            {countScore}%
          </span>
          <span className="text-[10px] text-muted mt-1">Goal: {careerGoal}</span>
        </div>
      </div>

      {/* Chart & Matched Skills Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart Component */}
        <div className="col-span-1 lg:col-span-7 p-6 rounded-xl glass-panel flex flex-col justify-between relative min-h-[350px]">
          <div>
            <h3 className="text-sm font-extrabold text-purpleLight uppercase tracking-wider mb-1">
              Alignment Radar
            </h3>
            <p className="text-xs text-muted">Core competence mapping across key job domains</p>
          </div>

          <div className="w-full h-[260px] mt-4 flex items-center justify-center">
            <ResponsiveContainer width="99%" height="100%">
              <RadarChart cx="50%" cy="50%" radius="80%" data={results.radarData}>
                <PolarGrid stroke="rgba(124, 58, 237, 0.15)" />
                <PolarAngleAxis
                  dataKey="subject"
                  stroke="#6B7280"
                  fontSize={10}
                  tick={{ fill: '#A78BFA', fontWeight: 500 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(124, 58, 237, 0.1)" tick={false} />
                <Radar
                  name="Your Level"
                  dataKey="A"
                  stroke="#7C3AED"
                  fill="#7C3AED"
                  fillOpacity={0.35}
                />
                <Radar
                  name="Required"
                  dataKey="B"
                  stroke="#06B6D4"
                  fill="none"
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-4 justify-center text-[10px] font-bold mt-2 pt-2 border-t border-purple/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-purple/40 border border-purple rounded" />
              <span className="text-purpleLight">Your Level</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 border-2 border-teal rounded" />
              <span className="text-tealLight">Required Benchmark</span>
            </div>
          </div>
        </div>

        {/* Matched Skills Component */}
        <div className="col-span-1 lg:col-span-5 p-6 rounded-xl glass-panel flex flex-col justify-between min-h-[350px]">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-extrabold text-tealLight uppercase tracking-wider">
                Matched Expertise
              </h3>
              <span className="text-[10px] bg-teal/20 text-tealLight px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Strong Match
              </span>
            </div>
            <p className="text-xs text-muted">Skills you hold that meet target requirements</p>
          </div>

          <div className="space-y-4 my-4 overflow-y-auto max-h-[220px] pr-1 flex-1">
            {results.matched.map((skill, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg border border-teal/20 bg-teal/5"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal" />
                  <span className="text-sm font-semibold text-text">{skill.name}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-purple/15 text-purpleLight border border-purple/20 capitalize font-medium">
                    {skill.domain}
                  </span>
                  <span className="text-[10px] text-tealLight font-bold uppercase">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-muted italic text-center pt-2 border-t border-purple/10">
            Great foundation. Maintain competency levels in these matched domains.
          </div>
        </div>
      </div>

      {/* Gap Skills Grid */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-purpleLight uppercase tracking-wider">
            Identified Gaps Checklist
          </h3>
          <p className="text-xs text-muted">Prioritized learning gaps to target in training cycles</p>
        </div>

        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Critical Gaps (Red Border) */}
          {results.gaps.critical.map((gap, i) => (
            <motion.div
              key={gap.name}
              variants={itemVariants}
              className="p-4 rounded-xl border border-error/30 bg-error/5 hover:bg-error/10 hover:border-error/50 transition-all flex flex-col justify-between gap-3"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[9px] bg-error/20 text-error px-2 py-0.5 rounded font-extrabold uppercase tracking-wide">
                    <AlertOctagon className="w-3 h-3" /> Critical
                  </span>
                  <h4 className="text-base font-bold text-text pt-1">{gap.name}</h4>
                </div>
                <span className="text-xs text-error font-semibold">{gap.jdPercent}% of JDs</span>
              </div>

              <div className="flex items-center justify-between text-xs text-muted border-t border-purple/5 pt-2">
                <div className="flex items-center gap-3">
                  <span className="bg-[#12121A] px-2 py-0.5 rounded text-[10px] text-purpleLight border border-purple/10">
                    {gap.domain}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-muted" /> {gap.weeksToLearn} weeks
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToRoadmap(gap.name)}
                  className={`text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    roadmapSkills.includes(gap.name) ? 'text-success' : 'text-purpleLight hover:text-purple'
                  }`}
                >
                  {roadmapSkills.includes(gap.name) ? 'Added ✓' : 'Add to Roadmap →'}
                </button>
              </div>
            </motion.div>
          ))}

          {/* Important Gaps (Amber Border) */}
          {results.gaps.important.map((gap, i) => (
            <motion.div
              key={gap.name}
              variants={itemVariants}
              className="p-4 rounded-xl border border-warning/30 bg-warning/5 hover:bg-warning/10 hover:border-warning/50 transition-all flex flex-col justify-between gap-3"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[9px] bg-warning/20 text-warning px-2 py-0.5 rounded font-extrabold uppercase tracking-wide">
                    <AlertTriangle className="w-3 h-3" /> Important
                  </span>
                  <h4 className="text-base font-bold text-text pt-1">{gap.name}</h4>
                </div>
                <span className="text-xs text-warning font-semibold">{gap.jdPercent}% of JDs</span>
              </div>

              <div className="flex items-center justify-between text-xs text-muted border-t border-purple/5 pt-2">
                <div className="flex items-center gap-3">
                  <span className="bg-[#12121A] px-2 py-0.5 rounded text-[10px] text-purpleLight border border-purple/10">
                    {gap.domain}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-muted" /> {gap.weeksToLearn} weeks
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToRoadmap(gap.name)}
                  className={`text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    roadmapSkills.includes(gap.name) ? 'text-success' : 'text-purpleLight hover:text-purple'
                  }`}
                >
                  {roadmapSkills.includes(gap.name) ? 'Added ✓' : 'Add to Roadmap →'}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Collapsible Nice-to-have Gaps (Gray Border) */}
        <div className="rounded-xl border border-purple/10 bg-[#12121A]/30 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsNiceExpanded(!isNiceExpanded)}
            className="w-full p-4 flex justify-between items-center bg-[#12121A]/80 hover:bg-[#12121A] transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[9px] bg-[#2E303A] text-muted px-2 py-0.5 rounded font-extrabold uppercase tracking-wide">
                <HelpCircle className="w-3 h-3" /> Nice-to-have
              </span>
              <span className="text-xs font-semibold text-text">Minor Gap Recommendations ({results.gaps.nice.length})</span>
            </div>
            <span className="text-xs text-purpleLight font-bold">
              {isNiceExpanded ? 'Collapse' : 'Expand Recommendations'}
            </span>
          </button>

          <AnimatePresence>
            {isNiceExpanded && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t border-purple/10 bg-[#0A0A0F]/50"
              >
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.gaps.nice.map((gap, i) => (
                    <div
                      key={gap.name}
                      className="p-3 rounded-lg border border-purple/10 bg-[#12121A]/40 flex flex-col justify-between gap-2"
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm font-bold text-text">{gap.name}</h5>
                        <span className="text-xs text-muted">{gap.jdPercent}% of JDs</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted pt-1">
                        <span className="text-[10px] text-purpleLight">{gap.domain}</span>
                        <button
                          type="button"
                          onClick={() => handleAddToRoadmap(gap.name)}
                          className={`text-xs font-bold transition-colors cursor-pointer ${
                            roadmapSkills.includes(gap.name) ? 'text-success' : 'text-purpleLight hover:text-purple'
                          }`}
                        >
                          {roadmapSkills.includes(gap.name) ? 'Added ✓' : 'Add to Roadmap →'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Panel */}
      <div className="p-6 rounded-xl border border-purple/20 bg-[#12121A]/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-sm font-bold text-purpleLight flex items-center gap-1.5 justify-center md:justify-start">
            <TrendingUp className="w-4 h-4 text-teal animate-bounce" /> roadmap synthesis panel
          </h4>
          <p className="text-xs text-muted max-w-xl">
            Clicking build roadmap will synthesize a custom training timeline focused on your selected skills. You can also return to edit your profile metrics at any time.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center">
          <button
            type="button"
            onClick={onUpdateSkills}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg border border-teal text-tealLight font-bold hover:bg-teal/10 hover:border-tealLight transition-all cursor-pointer text-xs uppercase"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Update Profile
          </button>
          <button
            type="button"
            onClick={buildRoadmap}
            disabled={roadmapBuilt}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg bg-purple hover:bg-purpleLight text-text font-bold shadow-glass-purple hover:shadow-purple/35 transition-all cursor-pointer text-xs uppercase"
          >
            <Map className="w-3.5 h-3.5" /> Build Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
