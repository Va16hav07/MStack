const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const Tenant = require('./models/Tenant');
const Organization = require('./models/Organization');
const User = require('./models/User');
const Role = require('./models/Role');
const Privilege = require('./models/Privilege');
const LegalEntity = require('./models/LegalEntity');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/user_management';

async function seed() {
  await mongoose.connect(MONGO_URI);

  // Clear collections
  await Promise.all([
    Tenant.deleteMany({}),
    Organization.deleteMany({}),
    User.deleteMany({}),
    Role.deleteMany({}),
    Privilege.deleteMany({}),
    LegalEntity.deleteMany({}),
  ]);

  // Tenants
  const tenantsData = [
    { id: uuidv4(), name: 'Acme Corp', description: 'Demo tenant', email: 'contact@acme.com', phone: '1234567890', website: 'https://acme.com', industry: 'Technology', annual_revenue: '1000000', employee_count: 100 },
    { id: uuidv4(), name: 'Beta Inc', description: 'Beta tenant', email: 'info@beta.com', phone: '9876543210', website: 'https://beta.com', industry: 'Finance', annual_revenue: '500000', employee_count: 50 },
  ];
  const tenants = await Tenant.insertMany(tenantsData);

  // Privileges per tenant
  const privilegesByTenant = {};
  for (const tenant of tenants) {
    privilegesByTenant[tenant.id] = await Privilege.insertMany([
      { id: uuidv4(), name: 'manage_users', description: 'Can manage users', resource: 'users', tenant_id: tenant.id },
      { id: uuidv4(), name: 'manage_roles', description: 'Can manage roles', resource: 'roles', tenant_id: tenant.id },
      { id: uuidv4(), name: 'manage_tenants', description: 'Can manage tenants', resource: 'tenants', tenant_id: tenant.id },
      { id: uuidv4(), name: 'view_reports', description: 'Can view reports', resource: 'reports', tenant_id: tenant.id },
    ]);
  }

  // Roles per tenant
  const rolesByTenant = {};
  for (const tenant of tenants) {
    const privs = privilegesByTenant[tenant.id];
    rolesByTenant[tenant.id] = await Role.insertMany([
      { id: uuidv4(), name: 'Admin', description: 'Administrator', tenant_id: tenant.id, is_system_role: true, privileges: privs.map(p => p.id) },
      { id: uuidv4(), name: 'Manager', description: 'Manager', tenant_id: tenant.id, privileges: [privs[0].id, privs[1].id] },
      { id: uuidv4(), name: 'User', description: 'Regular user', tenant_id: tenant.id, privileges: [privs[3].id] },
      { id: uuidv4(), name: 'Viewer', description: 'Viewer', tenant_id: tenant.id, privileges: [] },
    ]);
  }

  // Organizations per tenant
  const orgsByTenant = {};
  for (const tenant of tenants) {
    orgsByTenant[tenant.id] = await Organization.insertMany([
      { id: uuidv4(), tenant_id: tenant.id, name: 'HQ', description: 'Main office', organization_type: 'CUSTOMER', email: `hq@${tenant.name.toLowerCase().replace(/ /g, '')}.com`, phone: '1234567890', website: tenant.website, industry: tenant.industry, annual_revenue: tenant.annual_revenue, employee_count: tenant.employee_count, organization_profile: 'Main office profile' },
      { id: uuidv4(), tenant_id: tenant.id, name: 'Branch', description: 'Branch office', organization_type: 'CUSTOMER', email: `branch@${tenant.name.toLowerCase().replace(/ /g, '')}.com`, phone: '1234567891', website: tenant.website, industry: tenant.industry, annual_revenue: '500000', employee_count: 30, organization_profile: 'Branch office profile' },
    ]);
  }

  // Users per tenant
  for (const tenant of tenants) {
    const orgs = orgsByTenant[tenant.id];
    const roles = rolesByTenant[tenant.id];
    await User.insertMany([
      { id: uuidv4(), email: `admin@${tenant.name.toLowerCase().replace(/ /g, '')}.com`, passwordHash: await bcrypt.hash('admin123', 10), first_name: 'Admin', last_name: 'User', tenant_id: tenant.id, organization_id: orgs[0].id, roles: [roles[0].id], active: true },
      { id: uuidv4(), email: `manager@${tenant.name.toLowerCase().replace(/ /g, '')}.com`, passwordHash: await bcrypt.hash('manager123', 10), first_name: 'Manager', last_name: 'User', tenant_id: tenant.id, organization_id: orgs[1].id, roles: [roles[1].id], active: true },
      { id: uuidv4(), email: `user@${tenant.name.toLowerCase().replace(/ /g, '')}.com`, passwordHash: await bcrypt.hash('user123', 10), first_name: 'Regular', last_name: 'User', tenant_id: tenant.id, organization_id: orgs[1].id, roles: [roles[2].id], active: true },
    ]);
  }

  // Legal Entities per tenant
  for (const tenant of tenants) {
    await LegalEntity.insertMany([
      { id: uuidv4(), tenant_id: tenant.id, name: `${tenant.name} Legal`, legal_name: `${tenant.name} Corporation`, legal_entity_type: 'PARENT_ENTITY', address: '123 Main St', incorporation_date: new Date(), is_default: true, registration_number: 'REG123', tax_identifier: 'TAX123', jurisdiction_country: 'US', functional_currency: 'USD' },
      { id: uuidv4(), tenant_id: tenant.id, name: `${tenant.name} Sub`, legal_name: `${tenant.name} Sub Corp`, legal_entity_type: 'SUB_ENTITY', address: '456 Side St', incorporation_date: new Date(), is_default: false, registration_number: 'REG456', tax_identifier: 'TAX456', jurisdiction_country: 'US', functional_currency: 'USD' },
    ]);
  }

  console.log('Database seeded!');
  process.exit();
}

seed().catch(err => { console.error(err); process.exit(1); }); 