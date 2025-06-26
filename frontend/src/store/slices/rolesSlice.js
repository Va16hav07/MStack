import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rolesAPI } from '../../api';

// Async thunk for fetching roles
export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async (tenantId, { rejectWithValue }) => {
    try {
      const response = await rolesAPI.getAll(tenantId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch roles'
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
      });
  },
});

export const { fetchRolesStart, fetchRolesSuccess, fetchRolesFailure, createRoleStart, createRoleSuccess, createRoleFailure, updateRoleStart, updateRoleSuccess, updateRoleFailure, deleteRoleStart, deleteRoleSuccess, deleteRoleFailure } = rolesSlice.actions;
export default rolesSlice.reducer; 