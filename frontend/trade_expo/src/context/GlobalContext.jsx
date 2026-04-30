import { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    const completeUser = { 
      tickets: [], 
      activities: [{ type: 'auth', message: 'Logged in successfully', date: new Date().toLocaleString() }], 
      ...userData 
    };
    setUser(completeUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(completeUser));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  const updateUser = async (updatedData) => {
    try {
      // Sync with backend
      const profileToSync = {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        mobileNumber: updatedData.mobileNumber || updatedData.mobile,
        company: updatedData.company,
        designation: updatedData.designation,
        country: updatedData.country
      };
      
      const newUser = { 
        ...user, 
        ...updatedData,
        mobileNumber: updatedData.mobileNumber || updatedData.mobile 
      };
      
      // Add activity for profile update
      const activity = { type: 'profile', message: 'Updated profile information', date: new Date().toLocaleString() };
      newUser.activities = [activity, ...(newUser.activities || [])];
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Actual backend call is handled in Profile.jsx or here. 
      // Let's do it in Profile.jsx to handle loading/error states better, 
      // but keeping this for local state consistency.
    } catch (error) {
      console.error("Failed to update user context", error);
    }
  };

  const addTicket = (ticketData) => {
    if (!user) return;
    
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
