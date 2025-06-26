import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AppRouter from './app/AppRouter';

const App = () => (
  <div className="app-layout">
    <Navbar />
    <div className="main-content">
      <Sidebar />
      <div className="page-content">
        <AppRouter />
      </div>
    </div>
  </div>
);

export default App; 