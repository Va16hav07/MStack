import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tenantsAPI } from '../../api';

const initialState = {
  tenants: [],
  loading: false,
  error: null,
};

// Async thunk for fetching tenants
export const fetchTenants = createAsyncThunk(
  'tenants/fetchTenants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tenantsAPI.getAll();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch tenants'
      );
    }
  }
);

// Async thunk for creating a tenant
export const createTenant = createAsyncThunk(
  'tenants/createTenant',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tenantsAPI.create(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create tenant'
      );
    }
  }
);

const tenantsSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {
    fetchTenantsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTenantsSuccess(state, action) {
      state.loading = false;
      state.tenants = action.payload;
    },
    fetchTenantsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createTenantStart(state) {
      state.loading = true;
      state.error = null;
    },
    createTenantSuccess(state, action) {
      state.loading = false;
      state.tenants.push(action.payload);
    },
    createTenantFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateTenantStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateTenantSuccess(state, action) {
      state.loading = false;
      const idx = state.tenants.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.tenants[idx] = action.payload;
    },
    updateTenantFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTenantStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteTenantSuccess(state, action) {
      state.loading = false;
      state.tenants = state.tenants.filter(t => t.id !== action.payload);
    },
    deleteTenantFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants = action.payload;
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTenant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTenant.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants.push(action.payload);
      })
      .addCase(createTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchTenantsStart, fetchTenantsSuccess, fetchTenantsFailure, createTenantStart, createTenantSuccess, createTenantFailure, updateTenantStart, updateTenantSuccess, updateTenantFailure, deleteTenantStart, deleteTenantSuccess, deleteTenantFailure } = tenantsSlice.actions;
export default tenantsSlice.reducer; 