import { useState, useEffect } from 'react';

const MESSAGES = [
  'Scanning 1200 JDs...',
  'Comparing skills...',
  'Ranking gaps...',
  'Calculating match index...',
];

const MOCK_GAPS = {
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
};

const MOCK_MATCHED = [
  { name: 'Python', domain: 'Programming', level: 'Advanced' },
  { name: 'MySQL', domain: 'Databases', level: 'Intermediate' },
  { name: 'Excel Basic', domain: 'Tools', level: 'Intermediate' },
  { name: 'Communication', domain: 'Soft Skills', level: 'Advanced' },
];

export function useGapAnalysis() {
  const [screen, setScreen] = useState('trigger'); // 'trigger' | 'loading' | 'dashboard'
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState(MESSAGES[0]);
  const [profile, setProfile] = useState(null);
  const [careerGoal, setCareerGoal] = useState('');

  // Load profile and career goal from local storage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('antigravity_student_profile');
      const savedGoal = localStorage.getItem('antigravity_career_goal');

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        if (parsed.personal?.name) {
          // If profile has a name, use it
        }
      }
      
      setCareerGoal(savedGoal || 'Data Scientist');
    } catch (e) {
      console.error('Error loading data for gap analysis', e);
    }
  }, [screen]);

  // Loading animation simulation
  useEffect(() => {
    if (screen !== 'loading') return;

    setProgress(0);
    let messageIdx = 0;
    
    // Cycle scanning messages
    const messageInterval = setInterval(() => {
      messageIdx = (messageIdx + 1) % MESSAGES.length;
      setLoadingMessage(MESSAGES[messageIdx]);
    }, 700);

    // Progress bar up to 100% in 2.5 seconds (2500ms)
    const startTime = Date.now();
    const duration = 2500;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
        
        // Save to antigravity_gap_analysis
        const analysisResults = {
          matchScore: 68, // Mock Match score out of 100
          skillsHave: MOCK_MATCHED.length,
          skillsRequired: MOCK_MATCHED.length + MOCK_GAPS.critical.length + MOCK_GAPS.important.length,
          gapCount: MOCK_GAPS.critical.length + MOCK_GAPS.important.length,
          radarData: [
            { subject: 'Programming', A: 85, B: 90, fullMark: 100 },
            { subject: 'Databases', A: 70, B: 85, fullMark: 100 },
            { subject: 'Analysis', A: 40, B: 85, fullMark: 100 },
            { subject: 'Visualization', A: 30, B: 80, fullMark: 100 },
            { subject: 'Soft Skills', A: 80, B: 75, fullMark: 100 },
            { subject: 'Engineering', A: 20, B: 70, fullMark: 100 },
          ],
          gaps: MOCK_GAPS,
          matched: MOCK_MATCHED,
          runAt: new Date().toISOString(),
        };

        localStorage.setItem('antigravity_gap_analysis', JSON.stringify(analysisResults));
        setScreen('dashboard');
      }
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [screen]);

  const runAnalysis = () => {
    setScreen('loading');
  };

  const resetAnalysis = () => {
    setScreen('trigger');
    setProgress(0);
  };

  // Safe fallbacks for user names
  const studentName = profile?.personal?.name || 'Alex Chen';

  return {
    screen,
    progress,
    loadingMessage,
    studentName,
    careerGoal,
    runAnalysis,
    resetAnalysis,
  };
}
