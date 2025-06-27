# API Documentation

## Overview
Comprehensive API documentation for the User Management System.

## Base URL
- Development: `http://localhost:5000`
- Production: `https://m-stack.vercel.app/`
- Backend : `https://mstack-yttm.onrender.com`

## Authentication
All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <access_token>
```

## Endpoints

### Authentication

#### POST `/api/v1/auth/login`
**Request:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "name": "Admin User",
    "email": "admin@example.com",
    "user_id": "1",
    "tenant_id": "1",
    "organization_id": "1"
  }
}
```

#### POST `/api/v1/auth/refresh`
**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/v1/auth/logout`
Logout and invalidate tokens.

### Tenants

#### GET `/api/v1/tenants`
Retrieve all tenants.

#### POST `/api/v1/tenants`
**Request:**
```json
{
  "name": "New Corp",
  "description": "New tenant",
  "email": "contact@newcorp.com",
  "phone": "1234567890",
  "website": "https://newcorp.com",
  "industry": "Technology",
  "annual_revenue": "1000000",
  "employee_count": 100
}
```

#### PUT `/api/v1/tenants/:id`
Update tenant.

#### DELETE `/api/v1/tenants/:id`
Delete tenant.

### Organizations

#### GET `/api/v1/tenants/:tenant_id/organizations`
Get organizations for tenant.

#### POST `/api/v1/tenants/:tenant_id/organizations`
**Request:**
```json
{
  "name": "Branch Office",
  "description": "Branch location",
  "organization_type": "CUSTOMER",
  "email": "branch@company.com",
  "phone": "1234567890",
  "website": "https://company.com/branch",
  "industry": "Technology",
  "annual_revenue": "500000",
  "employee_count": 50
}
```

#### PUT `/api/v1/tenants/:tenant_id/organizations/:id`
Update organization.

#### DELETE `/api/v1/tenants/:tenant_id/organizations/:id`
Delete organization.

### Users

#### GET `/api/v1/tenants/:tenant_id/users`
Get users for tenant.

#### POST `/api/v1/tenants/:tenant_id/users`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "organization_id": "1",
  "roles": ["user"]
}
```

#### PUT `/api/v1/tenants/:tenant_id/users/:id`
Update user.

#### DELETE `/api/v1/tenants/:tenant_id/users/:id`
Delete user.

### Roles

#### GET `/api/v1/tenants/:tenant_id/roles`
Get roles for tenant.

#### POST `/api/v1/tenants/:tenant_id/roles`
**Request:**
```json
{
  "name": "manager",
  "description": "Team manager",
  "privileges": ["1", "2"]
}
```

#### PUT `/api/v1/tenants/:tenant_id/roles/:id`
Update role.

#### DELETE `/api/v1/tenants/:tenant_id/roles/:id`
Delete role.

### Privileges

#### GET `/api/v1/tenants/:tenant_id/privileges`
Get privileges for tenant.

#### POST `/api/v1/tenants/:tenant_id/privileges`
**Request:**
```json
{
  "name": "view_reports",
  "description": "Can view reports",
  "resource": "reports"
}
```

#### PUT `/api/v1/tenants/:tenant_id/privileges/:id`
Update privilege.

#### DELETE `/api/v1/tenants/:tenant_id/privileges/:id`
Delete privilege.

### Legal Entities

#### GET `/api/v1/tenants/:tenant_id/legal-entities`
Get legal entities for tenant.

#### POST `/api/v1/tenants/:tenant_id/legal-entities`
**Request:**
```json
{
  "name": "Legal Corp",
  "legal_name": "Legal Corporation",
  "legal_entity_type": "PARENT_ENTITY",
  "address": "123 Main St",
  "incorporation_date": "2024-01-01T00:00:00.000Z",
  "registration_number": "REG123",
  "tax_identifier": "TAX123",
  "jurisdiction_country": "US",
  "functional_currency": "USD"
}
```

#### PUT `/api/v1/tenants/:tenant_id/legal-entities/:id`
Update legal entity.

#### DELETE `/api/v1/tenants/:tenant_id/legal-entities/:id`
Delete legal entity.

## Error Responses

All endpoints return consistent error format:
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Common Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Usage Examples

### cURL
```bash
# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "admin123"}'

# Get users
curl -X GET http://localhost:5000/api/v1/tenants/1/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### JavaScript
```javascript
// Login
const response = await fetch('http://localhost:5000/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123'
  })
});

const data = await response.json();
const token = data.data.access_token;

// Get users
const usersResponse = await fetch('http://localhost:5000/api/v1/tenants/1/users', {
  headers: { 'Authorization': `Bearer ${token}` }
});
``` 