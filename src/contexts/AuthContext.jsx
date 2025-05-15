import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create an authentication context
const AuthContext = createContext(null);

// User data for testing
const testUsers = [
  {
    email: 'user1@gmail.com',
    password: 'user1',
    name: 'Olivia Rhye',
    profile_image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    profile_image: 'https://randomuser.me/api/portraits/men/32.jpg'
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in when app loads
  useEffect(() => {
    const userSession = sessionStorage.getItem('currentUser');
    if (userSession) {
      try {
        const user = JSON.parse(userSession);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing user session:', error);
        sessionStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // Check for specific user credentials
    const user = testUsers.find(u => u.email === email && u.password === password);
    
    // Support the backdoor login with admin123
    if (password === 'admin123') {
      const backdoorUser = {
        email: email || 'admin@example.com',
        name: 'Admin User',
        profile_image: 'https://randomuser.me/api/portraits/men/32.jpg'
      };
      
      // Store user info in sessionStorage (excluding password)
      sessionStorage.setItem('currentUser', JSON.stringify(backdoorUser));
      setCurrentUser(backdoorUser);
      return { success: true };
    }
    
    // Regular login check
    if (user) {
      // Create a copy without the password
      const userInfo = {
        email: user.email,
        name: user.name,
        profile_image: user.profile_image
      };
      
      // Store in sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(userInfo));
      setCurrentUser(userInfo);
      return { success: true };
    }
    
    return { 
      success: false, 
      message: 'Invalid email or password. Try user1@gmail.com / user1 or any email with password: admin123'
    };
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};