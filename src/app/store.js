import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../features/alertMessage/alertMessageSlice';

export const store = configureStore({
  reducer: {
    alert: alertReducer
  },
});
