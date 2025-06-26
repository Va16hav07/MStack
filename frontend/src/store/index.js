import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tenantsReducer from './slices/tenantsSlice';
import organizationsReducer from './slices/organizationsSlice';
import usersReducer from './slices/usersSlice';
import rolesReducer from './slices/rolesSlice';
import privilegesReducer from './slices/privilegesSlice';
import legalEntitiesReducer from './slices/legalEntitiesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tenants: tenantsReducer,
    organizations: organizationsReducer,
    users: usersReducer,
    roles: rolesReducer,
    privileges: privilegesReducer,
    legalEntities: legalEntitiesReducer,
  },
});

export default store; 