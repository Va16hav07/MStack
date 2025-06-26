import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <aside className="sidebar">
    <nav>
      <ul>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/tenants">Tenants</NavLink></li>
        <li><NavLink to="/organizations">Organizations</NavLink></li>
        <li><NavLink to="/users">Users</NavLink></li>
        <li><NavLink to="/roles">Roles</NavLink></li>
        <li><NavLink to="/privileges">Privileges</NavLink></li>
        <li><NavLink to="/legal-entities">Legal Entities</NavLink></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar; 