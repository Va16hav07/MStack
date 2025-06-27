import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './app/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LoginPage from './features/auth/LoginPage';
import DashboardPage from './features/dashboard/DashboardPage';
import TenantsPage from './features/tenants/TenantsPage';
import UsersPage from './features/users/UsersPage';
import OrganizationsPage from './features/organizations/OrganizationsPage';
import RolesPage from './features/roles/RolesPage';
import PrivilegesPage from './features/privileges/PrivilegesPage';
import LegalEntitiesPage from './features/legalEntities/LegalEntitiesPage';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for a smoother experience
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex flex-col items-center">
          <div className="relative mb-8">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl animate-pulse">
              <span className="text-3xl font-bold text-white">M</span>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl opacity-20 animate-ping"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
            <p className="text-gray-600 mb-6">Loading your workspace...</p>
          </div>
          <div className="relative">
            <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app-layout">
                <Navbar />
                <div className="main-content">
                  <Sidebar />
                  <main className="page-content">
                    <Outlet />
                  </main>
                </div>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tenants" element={<TenantsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="organizations" element={<OrganizationsPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="privileges" element={<PrivilegesPage />} />
          <Route path="legal-entities" element={<LegalEntitiesPage />} />
          <Route path="" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;