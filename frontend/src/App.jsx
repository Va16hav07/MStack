import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './app/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './features/auth/LoginPage';
import DashboardPage from './features/dashboard/DashboardPage';
import TenantsPage from './features/tenants/TenantsPage';
import UsersPage from './features/users/UsersPage';
import OrganizationsPage from './features/organizations/OrganizationsPage';
import RolesPage from './features/roles/RolesPage';
import PrivilegesPage from './features/privileges/PrivilegesPage';
import LegalEntitiesPage from './features/legalEntities/LegalEntitiesPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <div className="flex-1">
                  <Navbar />
                  <main className="flex-1">
                    <Outlet />
                  </main>
                </div>
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