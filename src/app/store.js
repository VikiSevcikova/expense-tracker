import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../features/alertMessage/alertMessageSlice';
import userReducer from '../features/userProfile/userSlice';

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer
  },
});
