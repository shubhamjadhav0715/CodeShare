/**
 * Redux Store Configuration
 * Combines all slices and configures the store
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import editorReducer from './slices/editorSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    editor: editorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
