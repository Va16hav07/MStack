import { createSlice } from '@reduxjs/toolkit';

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
});

export const { fetchPrivilegesStart, fetchPrivilegesSuccess, fetchPrivilegesFailure, createPrivilegeStart, createPrivilegeSuccess, createPrivilegeFailure, updatePrivilegeStart, updatePrivilegeSuccess, updatePrivilegeFailure, deletePrivilegeStart, deletePrivilegeSuccess, deletePrivilegeFailure } = privilegesSlice.actions;
export default privilegesSlice.reducer; 