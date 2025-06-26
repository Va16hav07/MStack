import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { organizationsAPI } from '../../api';

// Async thunk for fetching organizations
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async (tenantId, { rejectWithValue }) => {
    try {
      const response = await organizationsAPI.getAll(tenantId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch organizations'
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
      });
  },
});

export const { fetchOrganizationsStart, fetchOrganizationsSuccess, fetchOrganizationsFailure, createOrganizationStart, createOrganizationSuccess, createOrganizationFailure, updateOrganizationStart, updateOrganizationSuccess, updateOrganizationFailure, deleteOrganizationStart, deleteOrganizationSuccess, deleteOrganizationFailure } = organizationsSlice.actions;
export default organizationsSlice.reducer; 