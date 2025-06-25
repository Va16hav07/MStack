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