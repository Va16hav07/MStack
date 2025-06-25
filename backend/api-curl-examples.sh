#!/bin/bash

# Set these variables as needed
token="<ACCESS_TOKEN>"
tenant_id="<TENANT_ID>"
organization_id="<ORG_ID>"

# 1. Login (Authentication)
echo "\nLogin:"
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "string", "tenant_id": "'$tenant_id'"}'

# 2. Create Tenant
echo "\nCreate Tenant:"
curl -X POST http://localhost:5000/api/v1/tenants \
  -H "Content-Type: application/json" \
  -d '{"name": "Tenant 1", "email": "tenant1@example.com"}'

# 3. List Tenants
echo "\nList Tenants:"
curl -X GET http://localhost:5000/api/v1/tenants

# 4. Get Tenant by ID
echo "\nGet Tenant by ID:"
curl -X GET http://localhost:5000/api/v1/tenants/$tenant_id

# 5. Update Tenant
echo "\nUpdate Tenant:"
curl -X PUT http://localhost:5000/api/v1/tenants/$tenant_id \
  -H "Content-Type: application/json" \
  -d '{"name": "Tenant 1 Updated", "email": "tenant1@example.com"}'

# 6. Get Tenant Settings
echo "\nGet Tenant Settings:"
curl -X GET http://localhost:5000/api/v1/tenants/$tenant_id/settings

# 7. Update Tenant Settings
echo "\nUpdate Tenant Settings:"
curl -X PUT http://localhost:5000/api/v1/tenants/$tenant_id/settings \
  -H "Content-Type: application/json" \
  -d '{"theme": "dark", "language": "en", "timezone": "UTC"}'

# 8. Create Organization
echo "\nCreate Organization:"
curl -X POST http://localhost:5000/api/v1/tenants/$tenant_id/organizations \
  -H "Content-Type: application/json" \
  -d '{"name": "Org 1", "organization_type": "CUSTOMER", "email": "org1@example.com"}'

# 9. List Organizations
echo "\nList Organizations:"
curl -X GET "http://localhost:5000/api/v1/tenants/$tenant_id/organizations?page=1&page_size=10"

# 10. Get Organization by ID
echo "\nGet Organization by ID:"
curl -X GET http://localhost:5000/api/v1/tenants/$tenant_id/organizations/$organization_id

# 11. Update Organization
echo "\nUpdate Organization:"
curl -X PUT http://localhost:5000/api/v1/tenants/$tenant_id/organizations/$organization_id \
  -H "Content-Type: application/json" \
  -d '{"name": "Org 1 Updated", "organization_type": "CUSTOMER", "email": "org1@example.com"}'

# 12. Delete Organization (soft delete)
echo "\nDelete Organization:"
curl -X DELETE http://localhost:5000/api/v1/tenants/$tenant_id/organizations/$organization_id

# 13. Get Organization Profile
echo "\nGet Organization Profile:"
curl -X GET http://localhost:5000/api/v1/tenants/$tenant_id/organizations/$organization_id/profile

# 14. Update Organization Profile
echo "\nUpdate Organization Profile:"
curl -X PUT http://localhost:5000/api/v1/tenants/$tenant_id/organizations/$organization_id/profile \
  -H "Content-Type: application/json" \
  -d '{"name": "Org 1", "email": "org1@example.com"}'

# 15. Create User
echo "\nCreate User:"
curl -X POST http://localhost:5000/api/v1/tenants/$tenant_id/users \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "first_name": "John", "last_name": "Doe", "password": "password123", "organization_id": "$organization_id"}'

# 16. List Users
echo "\nList Users:"
curl -X GET "http://localhost:5000/api/v1/tenants/$tenant_id/users?page=1&page_size=10"

# 17. Get User by ID
echo "\nGet User by ID:"
curl -X GET http://localhost:5000/api/v1/tenants/$tenant_id/users/<USER_ID>

# 18. Update User
echo "\nUpdate User:"
curl -X PUT http://localhost:5000/api/v1/tenants/$tenant_id/users/<USER_ID> \
  -H "Content-Type: application/json" \
  -d '{"first_name": "Jane", "last_name": "Smith", "active": true}'

# 19. Get User Roles
echo "\nGet User Roles:"
curl -X GET http://localhost:5000/api/v1/tenants/$tenant_id/users/<USER_ID>/roles

# 20. Assign Roles to User
echo "\nAssign Roles to User:"
curl -X POST http://localhost:5000/api/v1/tenants/$tenant_id/users/<USER_ID>/roles \
  -H "Content-Type: application/json" \
  -d '{"role_ids": ["<ROLE_ID>"]}'

# 21. Remove Role from User
echo "\nRemove Role from User:"
curl -X DELETE http://localhost:5000/api/v1/tenants/$tenant_id/users/<USER_ID>/roles/<ROLE_ID>

# 22. List Roles
echo "\nList Roles:"
curl -X GET "http://localhost:5000/api/v1/tenants/$tenant_id/roles?page=1&page_size=10"

# 23. Create Role
echo "\nCreate Role:"
curl -X POST http://localhost:5000/api/v1/tenants/$tenant_id/roles \
  -H "Content-Type: application/json" \
  -d '{"name": "Admin", "description": "Admin role", "is_system_role": false, "permission_ids": ["<PRIVILEGE_ID>"]}'

# 24. Get Role by ID
echo "\nGet Role by ID:"
curl -X GET http://localhost:5000/api/v1/tenants/$tenant_id/roles/<ROLE_ID>

# 25. Update Role
echo "\nUpdate Role:"
curl -X PUT http://localhost:5000/api/v1/tenants/$tenant_id/roles/<ROLE_ID> \
  -H "Content-Type: application/json" \
  -d '{"description": "Updated role", "active": true, "permission_ids": ["<PRIVILEGE_ID>"]}'

# 26. Link Privilege to Role
echo "\nLink Privilege to Role:"
curl -X POST http://localhost:5000/api/v1/tenants/$tenant_id/roles/<ROLE_ID>/privileges/<PRIVILEGE_ID>/link

# 27. Unlink Privilege from Role
echo "\nUnlink Privilege from Role:"
curl -X POST http://localhost:5000/api/v1/tenants/$tenant_id/roles/<ROLE_ID>/privileges/<PRIVILEGE_ID>/unlink

# 28. List Privileges
echo "\nList Privileges:"
curl -X GET "http://localhost:5000/api/v1/tenants/$tenant_id/privileges?page=1&page_size=10"

# 29. Create Privilege
echo "\nCreate Privilege:"
curl -X POST http://localhost:5000/api/v1/tenants/$tenant_id/privileges \
  -H "Content-Type: application/json" \
  -d '{"name": "Read", "description": "Read access", "resource": "resource_name", "active": true}'

# 30. Get Privilege by ID
echo "\nGet Privilege by ID:"
curl -X GET http://localhost:5000/api/v1/tenants/$tenant_id/privileges/<PRIVILEGE_ID>

# 31. Update Privilege
echo "\nUpdate Privilege:"
curl -X PUT http://localhost:5000/api/v1/tenants/$tenant_id/privileges/<PRIVILEGE_ID> \
  -H "Content-Type: application/json" \
  -d '{"name": "Write", "description": "Write access", "resource": "resource_name", "active": true}'

# 32. List Legal Entities
echo "\nList Legal Entities:"
curl -X GET "http://localhost:5000/api/v1/tenants/$tenant_id/legal-entities?page=1&page_size=10"

# 33. Create Legal Entity
echo "\nCreate Legal Entity:"
curl -X POST http://localhost:5000/api/v1/tenants/$tenant_id/legal-entities \
  -H "Content-Type: application/json" \
  -d '{"name": "Entity 1", "legal_name": "Entity Legal Name", "legal_entity_type": "PARENT_ENTITY", "address": "123 Main St", "incorporation_date": "2025-06-22T15:33:11.557Z", "is_default": false, "registration_number": "REG123", "tax_identifier": "TAX123", "jurisdiction_country": "IN", "functional_currency": "INR"}'

# 34. Get Legal Entity by ID
echo "\nGet Legal Entity by ID:"
curl -X GET http://localhost:5000/api/v1/tenants/$tenant_id/legal-entities/<LEGAL_ENTITY_ID>

# 35. Update Legal Entity
echo "\nUpdate Legal Entity:"
curl -X PUT http://localhost:5000/api/v1/tenants/$tenant_id/legal-entities/<LEGAL_ENTITY_ID> \
  -H "Content-Type: application/json" \
  -d '{"name": "Entity 1 Updated", "legal_name": "Entity Legal Name Updated", "legal_entity_type": "PARENT_ENTITY", "address": "456 Main St", "incorporation_date": "2025-06-22T15:33:11.557Z", "is_default": false, "registration_number": "REG456", "tax_identifier": "TAX456", "jurisdiction_country": "IN", "functional_currency": "INR"}' 