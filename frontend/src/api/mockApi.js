// Mock database and network simulation
const mockDB = {
  users: [
    {
      id: '1',
      email: 'admin@example.com',
      password: 'admin123',
      first_name: 'Admin',
      last_name: 'User',
      roles: ['admin'],
      tenant_id: '1',
      organization_id: '1',
      active: true,
    },
  ],
  tenants: [
    {
      id: '1',
      name: 'Acme Corp',
      description: 'Demo tenant',
      email: 'contact@acme.com',
      phone: '1234567890',
      website: 'https://acme.com',
      logo_url: '',
      industry: 'Technology',
      annual_revenue: '1000000',
      employee_count: 100,
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  organizations: [
    {
      id: '1',
      tenant_id: '1',
      name: 'Acme HQ',
      description: 'Main office',
      organization_type: 'CUSTOMER',
      email: 'hq@acme.com',
      phone: '1234567890',
      website: 'https://acme.com',
      logo_url: '',
      industry: 'Technology',
      annual_revenue: '1000000',
      employee_count: 100,
      active: true,
      organization_profile: 'Main office profile',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  roles: [
    {
      id: '1',
      tenant_id: '1',
      name: 'admin',
      description: 'Administrator',
      active: true,
      is_system_role: true,
      privileges: ['1'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  privileges: [
    {
      id: '1',
      tenant_id: '1',
      name: 'manage_users',
      description: 'Can manage users',
      active: true,
      resource: 'users',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  legalEntities: [
    {
      id: '1',
      tenant_id: '1',
      name: 'Acme Legal',
      legal_name: 'Acme Corporation',
      legal_entity_type: 'PARENT_ENTITY',
      address: '123 Main St',
      incorporation_date: new Date().toISOString(),
      is_default: true,
      registration_number: 'REG123',
      tax_identifier: 'TAX123',
      jurisdiction_country: 'US',
      functional_currency: 'USD',
    },
  ],
};

function simulateNetwork(response, delay = 500) {
  return new Promise((resolve) => setTimeout(() => resolve(response), delay));
}

// Authentication
export function login({ email, password }) {
  const user = mockDB.users.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    return simulateNetwork({
      success: true,
      data: {
        access_token: 'mock-jwt-token',
        refresh_token: 'mock-refresh-token',
        token_type: 'bearer',
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        user_id: user.id,
        tenant_id: user.tenant_id,
        organization_id: user.organization_id,
        tenant_region_url: '',
      },
      message: 'Login successful',
    });
  } else {
    return simulateNetwork({
      success: false,
      error: 'Invalid credentials',
    }, 500);
  }
}

export function getTenants() {
  return simulateNetwork({
    success: true,
    data: mockDB.tenants,
  });
}
// Organizations
export function getOrganizations() {
  return simulateNetwork({
    success: true,
    data: mockDB.organizations,
  });
}
// Users
export function getUsers() {
  return simulateNetwork({
    success: true,
    data: mockDB.users,
  });
}

export function createUser(user) {
  const newUser = {
    ...user,
    id: (Math.random() * 1000000).toFixed(0),
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockDB.users.push(newUser);
  return simulateNetwork({ success: true, data: newUser });
}

export function updateUser(id, updates) {
  const idx = mockDB.users.findIndex(u => u.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'User not found' }, 400);
  }
  mockDB.users[idx] = {
    ...mockDB.users[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return simulateNetwork({ success: true, data: mockDB.users[idx] });
}

export function deleteUser(id) {
  const idx = mockDB.users.findIndex(u => u.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'User not found' }, 400);
  }
  mockDB.users.splice(idx, 1);
  return simulateNetwork({ success: true, data: id });
}
// Roles
export function getRoles() {
  return simulateNetwork({
    success: true,
    data: mockDB.roles,
  });
}
// Privileges
export function getPrivileges() {
  return simulateNetwork({
    success: true,
    data: mockDB.privileges,
  });
}
// Legal Entities
export function getLegalEntities() {
  return simulateNetwork({
    success: true,
    data: mockDB.legalEntities,
  });
}
// Add more CRUD (create, update, delete) as needed for each entity...

export function createTenant(tenant) {
  const newTenant = {
    ...tenant,
    id: (Math.random() * 1000000).toFixed(0),
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockDB.tenants.push(newTenant);
  return simulateNetwork({ success: true, data: newTenant });
}

export function updateTenant(id, updates) {
  const idx = mockDB.tenants.findIndex(t => t.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'Tenant not found' }, 400);
  }
  mockDB.tenants[idx] = {
    ...mockDB.tenants[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return simulateNetwork({ success: true, data: mockDB.tenants[idx] });
}

export function deleteTenant(id) {
  const idx = mockDB.tenants.findIndex(t => t.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'Tenant not found' }, 400);
  }
  mockDB.tenants.splice(idx, 1);
  return simulateNetwork({ success: true, data: id });
}

export function createOrganization(org) {
  const newOrg = {
    ...org,
    id: (Math.random() * 1000000).toFixed(0),
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockDB.organizations.push(newOrg);
  return simulateNetwork({ success: true, data: newOrg });
}

export function updateOrganization(id, updates) {
  const idx = mockDB.organizations.findIndex(o => o.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'Organization not found' }, 400);
  }
  mockDB.organizations[idx] = {
    ...mockDB.organizations[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return simulateNetwork({ success: true, data: mockDB.organizations[idx] });
}

export function deleteOrganization(id) {
  const idx = mockDB.organizations.findIndex(o => o.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'Organization not found' }, 400);
  }
  mockDB.organizations.splice(idx, 1);
  return simulateNetwork({ success: true, data: id });
}

export function createRole(role) {
  const newRole = {
    ...role,
    id: (Math.random() * 1000000).toFixed(0),
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockDB.roles.push(newRole);
  return simulateNetwork({ success: true, data: newRole });
}

export function updateRole(id, updates) {
  const idx = mockDB.roles.findIndex(r => r.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'Role not found' }, 400);
  }
  mockDB.roles[idx] = {
    ...mockDB.roles[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return simulateNetwork({ success: true, data: mockDB.roles[idx] });
}

export function deleteRole(id) {
  const idx = mockDB.roles.findIndex(r => r.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'Role not found' }, 400);
  }
  mockDB.roles.splice(idx, 1);
  return simulateNetwork({ success: true, data: id });
}

export function createPrivilege(priv) {
  const newPriv = {
    ...priv,
    id: (Math.random() * 1000000).toFixed(0),
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockDB.privileges.push(newPriv);
  return simulateNetwork({ success: true, data: newPriv });
}

export function updatePrivilege(id, updates) {
  const idx = mockDB.privileges.findIndex(p => p.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'Privilege not found' }, 400);
  }
  mockDB.privileges[idx] = {
    ...mockDB.privileges[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return simulateNetwork({ success: true, data: mockDB.privileges[idx] });
}

export function deletePrivilege(id) {
  const idx = mockDB.privileges.findIndex(p => p.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'Privilege not found' }, 400);
  }
  mockDB.privileges.splice(idx, 1);
  return simulateNetwork({ success: true, data: id });
}

export function createLegalEntity(entity) {
  const newEntity = {
    ...entity,
    id: (Math.random() * 1000000).toFixed(0),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockDB.legalEntities.push(newEntity);
  return simulateNetwork({ success: true, data: newEntity });
}

export function updateLegalEntity(id, updates) {
  const idx = mockDB.legalEntities.findIndex(e => e.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'Legal entity not found' }, 400);
  }
  mockDB.legalEntities[idx] = {
    ...mockDB.legalEntities[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return simulateNetwork({ success: true, data: mockDB.legalEntities[idx] });
}

export function deleteLegalEntity(id) {
  const idx = mockDB.legalEntities.findIndex(e => e.id === id);
  if (idx === -1) {
    return simulateNetwork({ success: false, error: 'Legal entity not found' }, 400);
  }
  mockDB.legalEntities.splice(idx, 1);
  return simulateNetwork({ success: true, data: id });
} 