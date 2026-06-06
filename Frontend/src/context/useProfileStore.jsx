import React, { createContext, useContext, useReducer, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'antigravity_student_profile';

const initialProfileState = {
  step: 1,
  personal: {
    name: '',
    course: '',
    year: '1st Year',
    college: '',
    city: '',
    photo: '', // base64 or placeholder url
  },
  academics: {
    cgpaType: 'cgpa', // 'cgpa' or 'percent'
    cgpaValue: '',
    major: '',
    achievements: '',
  },
  skills: [], // array of { name: string, level: 'Beginner'|'Intermediate'|'Advanced' }
  softSkills: {}, // object of { [skillName]: rating 1-5 }
  experience: {
    hasExperience: true,
    list: [], // array of { id, role, company, duration, work }
  },
  projects: [], // array of { id, title, stack, desc, github } (max 5)
  certifications: [], // array of { id, platform, name, year }
  careerGoals: {
    dreamRole: '',
    industries: [], // array of strings
    companies: [], // array of strings
    workPreference: 'Remote', // 'Remote' | 'Hybrid' | 'Onsite'
    timeline: 'Immediate (0-3 months)',
  },
  preferences: {
    formats: [], // array of ('Video' | 'Reading' | 'Hands-on' | 'Live')
    hoursPerWeek: 15,
  },
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STEP_DATA':
      return {
        ...state,
        [action.payload.stepKey]: {
          ...state[action.payload.stepKey],
          ...action.payload.data,
        },
      };
    case 'SET_ARRAY_DATA':
      return {
        ...state,
        [action.payload.stepKey]: action.payload.data,
      };
    case 'NEXT_STEP':
      return {
        ...state,
        step: Math.min(state.step + 1, 10), // 1 to 9 steps, 10 is final summary
      };
    case 'PREV_STEP':
      return {
        ...state,
        step: Math.max(state.step - 1, 1),
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        step: action.payload,
      };
    case 'RESET':
      return {
        ...initialProfileState,
        step: 1,
      };
    case 'LOAD_PERSISTED':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialProfileState);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_PERSISTED', payload: parsed });
      }
    } catch (e) {
      console.error('Error loading profile from localStorage', e);
    }
  }, []);

  // Sync to local storage on state changes
  useEffect(() => {
    if (state !== initialProfileState) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const updateStepData = (stepKey, data) => {
    dispatch({ type: 'UPDATE_STEP_DATA', payload: { stepKey, data } });
  };

  const setArrayData = (stepKey, data) => {
    dispatch({ type: 'SET_ARRAY_DATA', payload: { stepKey, data } });
  };

  const nextStep = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const goToStep = (stepNumber) => {
    dispatch({ type: 'GO_TO_STEP', payload: stepNumber });
  };

  const resetProfile = () => {
    dispatch({ type: 'RESET' });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Helper to calculate profile completeness score (%)
  const getCompletenessScore = () => {
    let completedPoints = 0;
    let totalPoints = 9;

    // Step 1
    if (state.personal.name && state.personal.course && state.personal.college && state.personal.city) completedPoints++;
    // Step 2
    if (state.academics.cgpaValue && state.academics.major) completedPoints++;
    // Step 3
    if (state.skills && state.skills.length > 0) completedPoints++;
    // Step 4
    if (state.softSkills && Object.keys(state.softSkills).length > 0) completedPoints++;
    // Step 5
    if (!state.experience.hasExperience || (state.experience.list && state.experience.list.length > 0)) completedPoints++;
    // Step 6
    if (state.projects && state.projects.length > 0) completedPoints++;
    // Step 7
    if (state.certifications && state.certifications.length > 0) completedPoints++;
    // Step 8
    if (state.careerGoals.dreamRole && state.careerGoals.industries.length > 0) completedPoints++;
    // Step 9
    if (state.preferences.formats.length > 0) completedPoints++;

    return Math.round((completedPoints / totalPoints) * 100);
  };

  return (
    <ProfileContext.Provider
      value={{
        state,
        updateStepData,
        setArrayData,
        nextStep,
        prevStep,
        goToStep,
        resetProfile,
        completenessScore: getCompletenessScore(),
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
