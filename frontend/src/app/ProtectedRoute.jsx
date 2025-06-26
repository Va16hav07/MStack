import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  
  // Temporarily allow access without authentication for testing
  // TODO: Remove this when authentication is properly implemented
  return children;
  
  // Original authentication logic (commented out for now)
  /*
  if (!token || token === 'mock-jwt-token-expired') {
    if (token === 'mock-jwt-token-expired') {
      // Remove expired token and user
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    }
    return <Navigate to="/login" replace />;
  }
  return children;
  */
};

export default ProtectedRoute; 