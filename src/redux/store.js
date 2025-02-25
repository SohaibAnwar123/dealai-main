import { configureStore } from '@reduxjs/toolkit';
import rulesReducer from './ruleSlice';

export const store = configureStore({
  reducer: {
    rules: rulesReducer,
  },
});
