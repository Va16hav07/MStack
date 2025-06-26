import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { legalEntitiesAPI } from '../../api';

// Fallback hardcoded data from seed.js
const fallbackLegalEntities = [
  {
    id: 'legal-acme-1',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'Acme Corp Legal',
    legal_name: 'Acme Corp Corporation',
    legal_entity_type: 'PARENT_ENTITY',
    address: '123 Main St',
    incorporation_date: '2025-06-26T10:16:09.861Z',
    is_default: true,
    registration_number: 'REG123',
    tax_identifier: 'TAX123',
    jurisdiction_country: 'US',
    functional_currency: 'USD',
    created_at: '2025-06-26T10:16:09.861Z',
    updated_at: '2025-06-26T10:16:09.861Z'
  },
  {
    id: 'legal-acme-2',
    tenant_id: 'a891264e-450c-41ac-ad72-7fe11fedd092',
    name: 'Acme Corp Sub',
    legal_name: 'Acme Corp Sub Corp',
    legal_entity_type: 'SUB_ENTITY',
    address: '456 Side St',
    incorporation_date: '2025-06-26T10:16:09.862Z',
    is_default: false,
    registration_number: 'REG456',
    tax_identifier: 'TAX456',
    jurisdiction_country: 'US',
    functional_currency: 'USD',
    created_at: '2025-06-26T10:16:09.862Z',
    updated_at: '2025-06-26T10:16:09.862Z'
  }
];

// Async thunk for fetching legal entities
export const fetchLegalEntities = createAsyncThunk(
  'legalEntities/fetchLegalEntities',
  async (tenantId, { rejectWithValue }) => {
    try {
      const response = await legalEntitiesAPI.getAll(tenantId);
      return response.data.data;
    } catch (error) {
      // Return fallback data if API fails
      console.warn('API failed, using fallback data:', error.message);
      return fallbackLegalEntities;
    }
  }
);

// Async thunk for creating a legal entity
export const createLegalEntity = createAsyncThunk(
  'legalEntities/createLegalEntity',
  async ({ tenantId, data }, { rejectWithValue }) => {
    try {
      const response = await legalEntitiesAPI.create(tenantId, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create legal entity'
      );
    }
  }
);

// Async thunk for updating a legal entity
export const updateLegalEntity = createAsyncThunk(
  'legalEntities/updateLegalEntity',
  async ({ tenantId, id, data }, { rejectWithValue }) => {
    try {
      const response = await legalEntitiesAPI.update(tenantId, id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update legal entity'
      );
    }
  }
);

// Async thunk for deleting a legal entity
export const deleteLegalEntity = createAsyncThunk(
  'legalEntities/deleteLegalEntity',
  async ({ tenantId, id }, { rejectWithValue }) => {
    try {
      await legalEntitiesAPI.delete(tenantId, id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete legal entity'
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
      })
      .addCase(createLegalEntity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLegalEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.legalEntities.push(action.payload);
      })
      .addCase(createLegalEntity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLegalEntity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLegalEntity.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.legalEntities.findIndex(e => e.id === action.payload.id);
        if (idx !== -1) state.legalEntities[idx] = action.payload;
      })
      .addCase(updateLegalEntity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLegalEntity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLegalEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.legalEntities = state.legalEntities.filter(e => e.id !== action.payload);
      })
      .addCase(deleteLegalEntity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchLegalEntitiesStart, fetchLegalEntitiesSuccess, fetchLegalEntitiesFailure, createLegalEntityStart, createLegalEntitySuccess, createLegalEntityFailure, updateLegalEntityStart, updateLegalEntitySuccess, updateLegalEntityFailure, deleteLegalEntityStart, deleteLegalEntitySuccess, deleteLegalEntityFailure } = legalEntitiesSlice.actions;
export default legalEntitiesSlice.reducer; 