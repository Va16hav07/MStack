import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export const tenantsAPI = {
  getAll: () => api.get('/tenants'),
  getById: (id) => api.get(`/tenants/${id}`),
  create: (data) => api.post('/tenants', data),
  update: (id, data) => api.put(`/tenants/${id}`, data),
};

export const usersAPI = {
  getAll: (tenantId, params = {}) => api.get(`/tenants/${tenantId}/users`, { params }),
  getById: (tenantId, id) => api.get(`/tenants/${tenantId}/users/${id}`),
  create: (tenantId, data) => api.post(`/tenants/${tenantId}/users`, data),
  update: (tenantId, id, data) => api.put(`/tenants/${tenantId}/users/${id}`, data),
  assignRoles: (tenantId, id, data) => api.post(`/tenants/${tenantId}/users/${id}/roles`, data),
};

export const rolesAPI = {
  getAll: (tenantId) => api.get(`/tenants/${tenantId}/roles`),
  getById: (tenantId, id) => api.get(`/tenants/${tenantId}/roles/${id}`),
  create: (tenantId, data) => api.post(`/tenants/${tenantId}/roles`, data),
  update: (tenantId, id, data) => api.put(`/tenants/${tenantId}/roles/${id}`, data),
  delete: (tenantId, id) => api.delete(`/tenants/${tenantId}/roles/${id}`),
};

export const privilegesAPI = {
  getAll: (tenantId) => api.get(`/tenants/${tenantId}/privileges`),
  getById: (tenantId, id) => api.get(`/tenants/${tenantId}/privileges/${id}`),
  create: (tenantId, data) => api.post(`/tenants/${tenantId}/privileges`, data),
  update: (tenantId, id, data) => api.put(`/tenants/${tenantId}/privileges/${id}`, data),
  delete: (tenantId, id) => api.delete(`/tenants/${tenantId}/privileges/${id}`),
};

export const legalEntitiesAPI = {
  getAll: (tenantId) => api.get(`/tenants/${tenantId}/legal-entities`),
  getById: (tenantId, id) => api.get(`/tenants/${tenantId}/legal-entities/${id}`),
  create: (tenantId, data) => api.post(`/tenants/${tenantId}/legal-entities`, data),
  update: (tenantId, id, data) => api.put(`/tenants/${tenantId}/legal-entities/${id}`, data),
  delete: (tenantId, id) => api.delete(`/tenants/${tenantId}/legal-entities/${id}`),
};

export const organizationsAPI = {
  getAll: (tenantId) => api.get(`/tenants/${tenantId}/organizations`),
  getById: (tenantId, id) => api.get(`/tenants/${tenantId}/organizations/${id}`),
  create: (tenantId, data) => api.post(`/tenants/${tenantId}/organizations`, data),
  update: (tenantId, id, data) => api.put(`/tenants/${tenantId}/organizations/${id}`, data),
  delete: (tenantId, id) => api.delete(`/tenants/${tenantId}/organizations/${id}`),
};

export default api; 