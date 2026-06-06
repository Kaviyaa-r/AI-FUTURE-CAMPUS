// ═══════════════════════════════════════════════════════════
// useAuthStore.js — AntiGravity Auth State Management
// Uses React Context + localStorage for mock auth
// ═══════════════════════════════════════════════════════════

import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);
const ToastContext = createContext(null);

export const useAuthStore = () => useContext(AuthContext);
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.map((toast) => (toast.id === id ? { ...toast, fading: true } : toast)));
      setTimeout(() => setToasts((t) => t.filter((toast) => toast.id !== id)), 350);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.fading ? 'fade-out' : ''}`}>
            <span className={`toast-dot ${t.type}`}></span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // ─── SIGNUP ─────────────────────────────────────────────
  // Stores user to localStorage under key: ag_user
  const signup = (name, email, password, role) => {
    const user = {
      name,
      email,
      passwordHash: btoa(password),
      role,
      createdAt: Date.now(),
    };
    localStorage.setItem('ag_user', JSON.stringify(user));
    return user;
  };

  // ─── LOGIN ──────────────────────────────────────────────
  // Reads localStorage ag_user and compares credentials
  const login = (email, password) => {
    const raw = localStorage.getItem('ag_user');
    if (!raw) return { success: false, error: 'No account found. Please sign up.' };
    const user = JSON.parse(raw);
    if (user.email !== email)
      return { success: false, error: 'No account found with that email.' };
    if (atob(user.passwordHash) !== password)
      return { success: false, error: 'Incorrect password.' };
    return { success: true, user };
  };

  // ─── SESSION ────────────────────────────────────────────
  // Persists session to localStorage or sessionStorage
  const persistSession = (email, role, remember = false) => {
    const session = { email, role, loggedInAt: Date.now() };
    if (remember) {
      localStorage.setItem('ag_session', JSON.stringify(session));
    } else {
      sessionStorage.setItem('ag_session', JSON.stringify(session));
    }
    setCurrentUser(session);
  };

  const getSession = () => {
    const ls = localStorage.getItem('ag_session');
    const ss = sessionStorage.getItem('ag_session');
    return ls ? JSON.parse(ls) : ss ? JSON.parse(ss) : null;
  };

  const logout = () => {
    localStorage.removeItem('ag_session');
    sessionStorage.removeItem('ag_session');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ signup, login, persistSession, getSession, logout, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthStore;

