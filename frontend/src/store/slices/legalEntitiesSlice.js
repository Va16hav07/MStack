import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  legalEntities: [],
  loading: false,
  error: null,
};

const legalEntitiesSlice = createSlice({
  name: 'legalEntities',
  initialState,
  reducers: {
    fetchLegalEntitiesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLegalEntitiesSuccess(state, action) {
      state.loading = false;
      state.legalEntities = action.payload;
    },
    fetchLegalEntitiesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createLegalEntityStart(state) {
      state.loading = true;
      state.error = null;
    },
    createLegalEntitySuccess(state, action) {
      state.loading = false;
      state.legalEntities.push(action.payload);
    },
    createLegalEntityFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateLegalEntityStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateLegalEntitySuccess(state, action) {
      state.loading = false;
      const idx = state.legalEntities.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) state.legalEntities[idx] = action.payload;
    },
    updateLegalEntityFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteLegalEntityStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteLegalEntitySuccess(state, action) {
      state.loading = false;
      state.legalEntities = state.legalEntities.filter(e => e.id !== action.payload);
    },
    deleteLegalEntityFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add more CRUD reducers as needed
  },
});

export const { fetchLegalEntitiesStart, fetchLegalEntitiesSuccess, fetchLegalEntitiesFailure, createLegalEntityStart, createLegalEntitySuccess, createLegalEntityFailure, updateLegalEntityStart, updateLegalEntitySuccess, updateLegalEntityFailure, deleteLegalEntityStart, deleteLegalEntitySuccess, deleteLegalEntityFailure } = legalEntitiesSlice.actions;
export default legalEntitiesSlice.reducer; 