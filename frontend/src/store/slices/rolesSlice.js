import { createSlice } from '@reduxjs/toolkit';

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
});

export const { fetchRolesStart, fetchRolesSuccess, fetchRolesFailure, createRoleStart, createRoleSuccess, createRoleFailure, updateRoleStart, updateRoleSuccess, updateRoleFailure, deleteRoleStart, deleteRoleSuccess, deleteRoleFailure } = rolesSlice.actions;
export default rolesSlice.reducer; 