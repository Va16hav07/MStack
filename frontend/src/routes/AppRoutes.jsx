import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Login = lazy(() => import('../features/auth/Login'));
const Dashboard = lazy(() => import('../features/dashboard/Dashboard'));
const Tenants = lazy(() => import('../features/tenants/Tenants'));
const Organizations = lazy(() => import('../features/organizations/Organizations'));
const Users = lazy(() => import('../features/users/Users'));
const Roles = lazy(() => import('../features/roles/Roles'));
const Privileges = lazy(() => import('../features/privileges/Privileges'));
const LegalEntities = lazy(() => import('../features/legalEntities/LegalEntities'));

const AppRoutes = () => (
  <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading...</div>}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/tenants/*" element={<Tenants />} />
      <Route path="/organizations/*" element={<Organizations />} />
      <Route path="/users/*" element={<Users />} />
      <Route path="/roles/*" element={<Roles />} />
      <Route path="/privileges/*" element={<Privileges />} />
      <Route path="/legal-entities/*" element={<LegalEntities />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes; 