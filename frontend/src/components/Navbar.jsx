import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      window.location.href = '/login';
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">User Management System</div>
      <div className="navbar__actions">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar; 