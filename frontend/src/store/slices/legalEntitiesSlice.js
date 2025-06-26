import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { legalEntitiesAPI } from '../../api';

// Async thunk for fetching legal entities
export const fetchLegalEntities = createAsyncThunk(
  'legalEntities/fetchLegalEntities',
  async (tenantId, { rejectWithValue }) => {
    try {
      const response = await legalEntitiesAPI.getAll(tenantId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch legal entities'
      );
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchLegalEntities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLegalEntities.fulfilled, (state, action) => {
        state.loading = false;
        state.legalEntities = action.payload;
      })
      .addCase(fetchLegalEntities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchLegalEntitiesStart, fetchLegalEntitiesSuccess, fetchLegalEntitiesFailure, createLegalEntityStart, createLegalEntitySuccess, createLegalEntityFailure, updateLegalEntityStart, updateLegalEntitySuccess, updateLegalEntityFailure, deleteLegalEntityStart, deleteLegalEntitySuccess, deleteLegalEntityFailure } = legalEntitiesSlice.actions;
export default legalEntitiesSlice.reducer; 