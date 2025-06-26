import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import TenantsPage from '../features/tenants/TenantsPage';
import OrganizationsPage from '../features/organizations/OrganizationsPage';
import UsersPage from '../features/users/UsersPage';
import RolesPage from '../features/roles/RolesPage';
import PrivilegesPage from '../features/privileges/PrivilegesPage';
import LegalEntitiesPage from '../features/legalEntities/LegalEntitiesPage';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    <Route path="/tenants/*" element={<ProtectedRoute><TenantsPage /></ProtectedRoute>} />
    <Route path="/organizations/*" element={<ProtectedRoute><OrganizationsPage /></ProtectedRoute>} />
    <Route path="/users/*" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
    <Route path="/roles/*" element={<ProtectedRoute><RolesPage /></ProtectedRoute>} />
    <Route path="/privileges/*" element={<ProtectedRoute><PrivilegesPage /></ProtectedRoute>} />
    <Route path="/legal-entities/*" element={<ProtectedRoute><LegalEntitiesPage /></ProtectedRoute>} />
    <Route path="/" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRouter; 