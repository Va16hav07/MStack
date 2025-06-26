import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersAPI } from '../../api';

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ tenantId, params = {} }, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getAll(tenantId, params);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail?.[0]?.msg || 'Failed to fetch users'
      );
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async ({ tenantId, userData }, { rejectWithValue }) => {
    try {
      const response = await usersAPI.create(tenantId, userData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail?.[0]?.msg || 'Failed to create user'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ tenantId, id, data }, { rejectWithValue }) => {
    try {
      const response = await usersAPI.update(tenantId, id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail?.[0]?.msg || 'Failed to update user'
      );
    }
  }
);

export const assignRoles = createAsyncThunk(
  'users/assignRoles',
  async ({ tenantId, userId, roleIds }, { rejectWithValue }) => {
    try {
      const response = await usersAPI.assignRoles(tenantId, userId, { role_ids: roleIds });
      return { userId, roleIds };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail?.[0]?.msg || 'Failed to assign roles'
      );
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Assign roles
      .addCase(assignRoles.fulfilled, (state, action) => {
        const user = state.users.find(u => u.id === action.payload.userId);
        if (user) {
          user.roles = action.payload.roleIds;
        }
      });
  },
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer; 