import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rolesAPI } from '../../api';

// Fallback hardcoded data from seed.js
const fallbackRoles = [
  {
    id: 'role-admin-1',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'Admin',
    description: 'Administrator',
    is_system_role: true,
    privileges: ['manage_users', 'manage_roles', 'manage_tenants', 'view_reports'],
    created_at: '2025-06-26T10:16:09.861Z',
    updated_at: '2025-06-26T10:16:09.861Z'
  },
  {
    id: 'role-manager-1',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'Manager',
    description: 'Manager',
    is_system_role: false,
    privileges: ['manage_users', 'manage_roles'],
    created_at: '2025-06-26T10:16:09.862Z',
    updated_at: '2025-06-26T10:16:09.862Z'
  },
  {
    id: 'role-user-1',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'User',
    description: 'Regular user',
    is_system_role: false,
    privileges: ['view_reports'],
    created_at: '2025-06-26T10:16:09.863Z',
    updated_at: '2025-06-26T10:16:09.863Z'
  },
  {
    id: 'role-viewer-1',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'Viewer',
    description: 'Viewer',
    is_system_role: false,
    privileges: [],
    created_at: '2025-06-26T10:16:09.864Z',
    updated_at: '2025-06-26T10:16:09.864Z'
  }
];

// Async thunk for fetching roles
export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async (tenantId, { rejectWithValue }) => {
    try {
      const response = await rolesAPI.getAll(tenantId);
      return response.data.data;
    } catch (error) {
      // Return fallback data if API fails
      console.warn('API failed, using fallback data:', error.message);
      return fallbackRoles;
    }
  }
);

// Async thunk for creating a role
export const createRole = createAsyncThunk(
  'roles/createRole',
  async ({ tenantId, data }, { rejectWithValue }) => {
    try {
      const response = await rolesAPI.create(tenantId, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create role'
      );
    }
  }
);

// Async thunk for updating a role
export const updateRole = createAsyncThunk(
  'roles/updateRole',
  async ({ tenantId, id, data }, { rejectWithValue }) => {
    try {
      const response = await rolesAPI.update(tenantId, id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update role'
      );
    }
  }
);

// Async thunk for deleting a role
export const deleteRole = createAsyncThunk(
  'roles/deleteRole',
  async ({ tenantId, id }, { rejectWithValue }) => {
    try {
      await rolesAPI.delete(tenantId, id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete role'
      );
    }
  }
);

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    fetchRolesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRolesSuccess(state, action) {
      state.loading = false;
      state.roles = action.payload;
    },
    fetchRolesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createRoleStart(state) {
      state.loading = true;
      state.error = null;
    },
    createRoleSuccess(state, action) {
      state.loading = false;
      state.roles.push(action.payload);
    },
    createRoleFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateRoleStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateRoleSuccess(state, action) {
      state.loading = false;
      const idx = state.roles.findIndex(r => r.id === action.payload.id);
      if (idx !== -1) state.roles[idx] = action.payload;
    },
    updateRoleFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteRoleStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteRoleSuccess(state, action) {
      state.loading = false;
      state.roles = state.roles.filter(r => r.id !== action.payload);
    },
    deleteRoleFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add more CRUD reducers as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.roles.findIndex(r => r.id === action.payload.id);
        if (idx !== -1) state.roles[idx] = action.payload;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter(r => r.id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchRolesStart, fetchRolesSuccess, fetchRolesFailure, createRoleStart, createRoleSuccess, createRoleFailure, updateRoleStart, updateRoleSuccess, updateRoleFailure, deleteRoleStart, deleteRoleSuccess, deleteRoleFailure } = rolesSlice.actions;
export default rolesSlice.reducer; 