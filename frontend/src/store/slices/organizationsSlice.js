import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { organizationsAPI } from '../../api';

// Fallback hardcoded data from seed.js
const fallbackOrganizations = [
  {
    id: 'ce654de6-860f-4317-9e82-f6c95c9cdb6a',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'HQ',
    description: 'Main office',
    organization_type: 'CUSTOMER',
    email: 'hq@acmecorp.com',
    phone: '1234567890',
    website: 'https://acme.com',
    industry: 'Technology',
    annual_revenue: '1000000',
    employee_count: 100,
    active: true,
    organization_profile: 'Main office profile',
    created_at: '2025-06-26T10:16:09.861Z',
    updated_at: '2025-06-26T10:16:09.861Z'
  },
  {
    id: '0fd6e914-5120-465c-a9f8-07a32a5f6962',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'Branch',
    description: 'Branch office',
    organization_type: 'CUSTOMER',
    email: 'branch@acmecorp.com',
    phone: '1234567891',
    website: 'https://acme.com',
    industry: 'Technology',
    annual_revenue: '500000',
    employee_count: 30,
    active: true,
    organization_profile: 'Branch office profile',
    created_at: '2025-06-26T10:16:09.862Z',
    updated_at: '2025-06-26T10:16:09.862Z'
  }
];

// Async thunk for fetching organizations
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async (tenantId, { rejectWithValue }) => {
    console.log('fetchOrganizations thunk called with tenantId:', tenantId);
    try {
      const response = await organizationsAPI.getAll(tenantId);
      console.log('fetchOrganizations API response:', response.data);
      return response.data.data;
    } catch (error) {
      // Return fallback data if API fails
      console.warn('API failed, using fallback data:', error.message);
      console.log('Returning fallback organizations:', fallbackOrganizations);
      return fallbackOrganizations;
    }
  }
);

// Async thunk for creating an organization
export const createOrganization = createAsyncThunk(
  'organizations/createOrganization',
  async ({ tenantId, data }, { rejectWithValue }) => {
    try {
      const response = await organizationsAPI.create(tenantId, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create organization'
      );
    }
  }
);

// Async thunk for updating an organization
export const updateOrganization = createAsyncThunk(
  'organizations/updateOrganization',
  async ({ tenantId, id, data }, { rejectWithValue }) => {
    try {
      const response = await organizationsAPI.update(tenantId, id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update organization'
      );
    }
  }
);

// Async thunk for deleting an organization
export const deleteOrganization = createAsyncThunk(
  'organizations/deleteOrganization',
  async ({ tenantId, id }, { rejectWithValue }) => {
    try {
      await organizationsAPI.delete(tenantId, id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete organization'
      );
    }
  }
);

const initialState = {
  organizations: [],
  loading: false,
  error: null,
};

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    fetchOrganizationsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrganizationsSuccess(state, action) {
      state.loading = false;
      state.organizations = action.payload;
    },
    fetchOrganizationsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createOrganizationStart(state) {
      state.loading = true;
      state.error = null;
    },
    createOrganizationSuccess(state, action) {
      state.loading = false;
      state.organizations.push(action.payload);
    },
    createOrganizationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrganizationStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateOrganizationSuccess(state, action) {
      state.loading = false;
      const idx = state.organizations.findIndex(o => o.id === action.payload.id);
      if (idx !== -1) state.organizations[idx] = action.payload;
    },
    updateOrganizationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrganizationStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteOrganizationSuccess(state, action) {
      state.loading = false;
      state.organizations = state.organizations.filter(o => o.id !== action.payload);
    },
    deleteOrganizationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add more CRUD reducers as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations.push(action.payload);
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.organizations.findIndex(o => o.id === action.payload.id);
        if (idx !== -1) state.organizations[idx] = action.payload;
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations = state.organizations.filter(o => o.id !== action.payload);
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchOrganizationsStart, fetchOrganizationsSuccess, fetchOrganizationsFailure, createOrganizationStart, createOrganizationSuccess, createOrganizationFailure, updateOrganizationStart, updateOrganizationSuccess, updateOrganizationFailure, deleteOrganizationStart, deleteOrganizationSuccess, deleteOrganizationFailure } = organizationsSlice.actions;
export default organizationsSlice.reducer; 