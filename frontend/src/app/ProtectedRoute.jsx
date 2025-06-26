import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
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
};

export default ProtectedRoute; 