import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { currentUser, isAuthenticated } = useAuth();
  
  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // If authenticated, render the child component
  return children;
};

export default ProtectedRoute;