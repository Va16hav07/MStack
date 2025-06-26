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
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-primary-700">M</span>
          </div>
          <div className="relative">
            <div className="h-1.5 w-32 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex flex-1">
                  <Sidebar />
                  <main className="page-content pb-16">
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