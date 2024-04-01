import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice.js';
import reloadReducer from './reloadSlice.js'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    reload:reloadReducer
  },
});