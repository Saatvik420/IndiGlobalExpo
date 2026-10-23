import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const GlobalContext = createContext();

// Inactivity logout time period: 30 minutes (in milliseconds)
// Configurable via VITE_SESSION_TIMEOUT_MINUTES environment variable
const SESSION_TIMEOUT_MS = (Number(import.meta.env.VITE_SESSION_TIMEOUT_MINUTES) || 30) * 60 * 1000;
const LAST_ACTIVITY_KEY = 'last_active_time';

export const GlobalProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Synchronous session initialization so protected routes never bounce on reload
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const lastActive = localStorage.getItem(LAST_ACTIVITY_KEY);
      const now = Date.now();
      if (savedUser) {
        if (lastActive && (now - Number(lastActive) > SESSION_TIMEOUT_MS)) {
          localStorage.removeItem('user');
          localStorage.removeItem(LAST_ACTIVITY_KEY);
          return null;
        }
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed to parse saved user from localStorage', e);
    }
    return null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const lastActive = localStorage.getItem(LAST_ACTIVITY_KEY);
      const now = Date.now();
      if (savedUser) {
        if (lastActive && (now - Number(lastActive) > SESSION_TIMEOUT_MS)) {
          return false;
        }
        return true;
      }
    } catch (e) {}
    return false;
  });

  const lastActivityRef = useRef(Date.now());

  // Logout function: cleans state and localStorage completely
  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    try {
      localStorage.removeItem('user');
      localStorage.removeItem(LAST_ACTIVITY_KEY);
    } catch (e) {
      console.error('Error removing session keys from localStorage', e);
    }
  }, []);

  // Update activity timestamp in-memory and periodically in localStorage
  const recordActivity = useCallback(() => {
    const now = Date.now();
    lastActivityRef.current = now;
    // Throttle writing to localStorage to at most once every 10 seconds
    try {
      const stored = localStorage.getItem(LAST_ACTIVITY_KEY);
      if (!stored || now - Number(stored) > 10000) {
        localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
      }
    } catch (e) {}
  }, []);

  // Initialize session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const lastActive = localStorage.getItem(LAST_ACTIVITY_KEY);
      const now = Date.now();

      if (savedUser) {
        if (lastActive && (now - Number(lastActive) > SESSION_TIMEOUT_MS)) {
          // Session expired while user was away / browser was closed
          logout();
        } else {
          setUser(JSON.parse(savedUser));
          setIsLoggedIn(true);
          lastActivityRef.current = now;
          localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
        }
      }
    } catch (e) {
      console.error('Failed to parse saved user from localStorage', e);
      logout();
    }
  }, [logout]);

  // Inactivity timeout manager: runs in the background without UI display
  useEffect(() => {
    if (!isLoggedIn) return;

    // Background interval checking every 15 seconds
    const intervalId = setInterval(() => {
      const now = Date.now();
      let lastActive = lastActivityRef.current;
      try {
        const stored = localStorage.getItem(LAST_ACTIVITY_KEY);
        if (stored) {
          lastActive = Math.max(lastActive, Number(stored));
        }
      } catch (e) {}

      if (now - lastActive > SESSION_TIMEOUT_MS) {
        // Time period elapsed with no activity -> silent auto logout
        logout();
      }
    }, 15000);

    // Activity event listeners to keep session alive while user interacts
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    const handleUserInteraction = () => {
      recordActivity();
    };

    activityEvents.forEach((ev) => {
      window.addEventListener(ev, handleUserInteraction, { passive: true });
    });

    // Also handle unauthorized event from API client
    const handleUnauthorized = () => {
      logout();
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      clearInterval(intervalId);
      activityEvents.forEach((ev) => {
        window.removeEventListener(ev, handleUserInteraction);
      });
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [isLoggedIn, logout, recordActivity]);

  const login = (userData) => {
    const completeUser = { 
      tickets: [], 
      activities: [{ type: 'auth', message: 'Logged in successfully', date: new Date().toLocaleString() }], 
      ...userData 
    };
    const now = Date.now();
    lastActivityRef.current = now;
    setUser(completeUser);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('user', JSON.stringify(completeUser));
      localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
    } catch (e) {
      console.error('Error saving user to localStorage', e);
    }
  };

  const updateUser = async (updatedData) => {
    try {
      recordActivity();
      const newUser = { 
        ...user, 
        ...updatedData,
        mobileNumber: updatedData.mobileNumber || updatedData.mobile 
      };
      
      const activity = { type: 'profile', message: 'Updated profile information', date: new Date().toLocaleString() };
      newUser.activities = [activity, ...(newUser.activities || [])];
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error("Failed to update user context", error);
    }
  };

  const addTicket = (ticketData) => {
    if (!user) return;
    recordActivity();
    
    const ticketActivity = { 
      type: 'ticket', 
      message: `Purchased ${ticketData.type} pass (${ticketData.bookingId})`, 
      date: new Date().toLocaleString() 
    };
    
    const updatedTickets = [...(user.tickets || []), ticketData];
    const updatedActivities = [ticketActivity, ...(user.activities || [])];
    
    const newUser = { ...user, tickets: updatedTickets, activities: updatedActivities };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const addActivity = (type, message) => {
    if (!user) return;
    recordActivity();
    const newActivity = { type, message, date: new Date().toLocaleString() };
    const newUser = { ...user, activities: [newActivity, ...(user.activities || [])] };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <GlobalContext.Provider
      value={{
        isMenuOpen,
        toggleMenu,
        closeMenu,
        openMenu,
        isLoading,
        startLoading,
        stopLoading,
        isLoggedIn,
        user,
        login,
        logout,
        updateUser,
        addTicket,
        addActivity
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};

export default GlobalContext;
