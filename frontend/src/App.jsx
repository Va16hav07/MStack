import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

const Sidebar = () => (
  <aside className="w-64 h-full bg-gray-900 text-white flex flex-col p-4 hidden md:block">
    <div className="text-2xl font-bold mb-8">UMS</div>
    <nav className="flex flex-col gap-4">
      <a href="/" className="hover:text-blue-400">Dashboard</a>
      <a href="/tenants" className="hover:text-blue-400">Tenants</a>
      <a href="/organizations" className="hover:text-blue-400">Organizations</a>
      <a href="/users" className="hover:text-blue-400">Users</a>
      <a href="/roles" className="hover:text-blue-400">Roles</a>
      <a href="/privileges" className="hover:text-blue-400">Privileges</a>
      <a href="/legal-entities" className="hover:text-blue-400">Legal Entities</a>
    </nav>
  </aside>
);

const Topbar = () => (
  <header className="w-full h-16 bg-white shadow flex items-center px-6 justify-between">
    <div className="font-semibold text-lg">User Management System</div>
    <div className="flex items-center gap-4">
      <span className="text-gray-600">Welcome, Admin</span>
      <button className="bg-blue-500 text-white px-3 py-1 rounded">Logout</button>
    </div>
  </header>
);

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 bg-gray-50 p-6 overflow-auto">
            <AppRoutes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
