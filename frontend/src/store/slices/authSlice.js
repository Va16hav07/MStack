import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../api';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      const { data } = response.data;
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify({
        id: data.user_id,
        email: data.email,
        name: data.name,
        tenant_id: data.tenant_id,
        organization_id: data.organization_id,
      }));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail?.[0]?.msg || 'Login failed'
      );
    }
  }
);

const persistedUser = JSON.parse(localStorage.getItem('user')) || null;
const persistedToken = localStorage.getItem('access_token') || null;

const initialState = {
  user: persistedUser,
  token: persistedToken,
  loading: false,
  error: null,
  isAuthenticated: !!persistedToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        state.user = {
          id: action.payload.user_id,
          email: action.payload.email,
          name: action.payload.name,
          tenant_id: action.payload.tenant_id,
          organization_id: action.payload.organization_id,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer; 