import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privilegesAPI } from '../../api';

// Fallback hardcoded data from seed.js
const fallbackPrivileges = [
  {
    id: 'priv-manage-users-1',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'manage_users',
    description: 'Can manage users',
    resource: 'users',
    created_at: '2025-06-26T10:16:09.861Z',
    updated_at: '2025-06-26T10:16:09.861Z'
  },
  {
    id: 'priv-manage-roles-1',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'manage_roles',
    description: 'Can manage roles',
    resource: 'roles',
    created_at: '2025-06-26T10:16:09.862Z',
    updated_at: '2025-06-26T10:16:09.862Z'
  },
  {
    id: 'priv-manage-tenants-1',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'manage_tenants',
    description: 'Can manage tenants',
    resource: 'tenants',
    created_at: '2025-06-26T10:16:09.863Z',
    updated_at: '2025-06-26T10:16:09.863Z'
  },
  {
    id: 'priv-view-reports-1',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'view_reports',
    description: 'Can view reports',
    resource: 'reports',
    created_at: '2025-06-26T10:16:09.864Z',
    updated_at: '2025-06-26T10:16:09.864Z'
  }
];

// Async thunk for fetching privileges
export const fetchPrivileges = createAsyncThunk(
  'privileges/fetchPrivileges',
  async (tenantId, { rejectWithValue }) => {
    try {
      const response = await privilegesAPI.getAll(tenantId);
      return response.data.data;
    } catch (error) {
      // Return fallback data if API fails
      console.warn('API failed, using fallback data:', error.message);
      return fallbackPrivileges;
    }
  }
);

// Async thunk for creating a privilege
export const createPrivilege = createAsyncThunk(
  'privileges/createPrivilege',
  async ({ tenantId, data }, { rejectWithValue }) => {
    try {
      const response = await privilegesAPI.create(tenantId, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create privilege'
      );
    }
  }
);

// Async thunk for updating a privilege
export const updatePrivilege = createAsyncThunk(
  'privileges/updatePrivilege',
  async ({ tenantId, id, data }, { rejectWithValue }) => {
    try {
      const response = await privilegesAPI.update(tenantId, id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update privilege'
      );
    }
  }
);

// Async thunk for deleting a privilege
export const deletePrivilege = createAsyncThunk(
  'privileges/deletePrivilege',
  async ({ tenantId, id }, { rejectWithValue }) => {
    try {
      await privilegesAPI.delete(tenantId, id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete privilege'
      );
    }
  }
);

const initialState = {
  privileges: [],
  loading: false,
  error: null,
};

const privilegesSlice = createSlice({
  name: 'privileges',
  initialState,
  reducers: {
    fetchPrivilegesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPrivilegesSuccess(state, action) {
      state.loading = false;
      state.privileges = action.payload;
    },
    fetchPrivilegesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createPrivilegeStart(state) {
      state.loading = true;
      state.error = null;
    },
    createPrivilegeSuccess(state, action) {
      state.loading = false;
      state.privileges.push(action.payload);
    },
    createPrivilegeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePrivilegeStart(state) {
      state.loading = true;
      state.error = null;
    },
    updatePrivilegeSuccess(state, action) {
      state.loading = false;
      const idx = state.privileges.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) state.privileges[idx] = action.payload;
    },
    updatePrivilegeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deletePrivilegeStart(state) {
      state.loading = true;
      state.error = null;
    },
    deletePrivilegeSuccess(state, action) {
      state.loading = false;
      state.privileges = state.privileges.filter(p => p.id !== action.payload);
    },
    deletePrivilegeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add more CRUD reducers as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivileges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrivileges.fulfilled, (state, action) => {
        state.loading = false;
        state.privileges = action.payload;
      })
      .addCase(fetchPrivileges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPrivilege.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPrivilege.fulfilled, (state, action) => {
        state.loading = false;
        state.privileges.push(action.payload);
      })
      .addCase(createPrivilege.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePrivilege.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePrivilege.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.privileges.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.privileges[idx] = action.payload;
      })
      .addCase(updatePrivilege.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePrivilege.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePrivilege.fulfilled, (state, action) => {
        state.loading = false;
        state.privileges = state.privileges.filter(p => p.id !== action.payload);
      })
      .addCase(deletePrivilege.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchPrivilegesStart, fetchPrivilegesSuccess, fetchPrivilegesFailure, createPrivilegeStart, createPrivilegeSuccess, createPrivilegeFailure, updatePrivilegeStart, updatePrivilegeSuccess, updatePrivilegeFailure, deletePrivilegeStart, deletePrivilegeSuccess, deletePrivilegeFailure } = privilegesSlice.actions;
export default privilegesSlice.reducer; 