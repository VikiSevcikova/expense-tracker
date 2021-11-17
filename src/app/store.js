import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../features/alertMessage/alertMessageSlice';
import transactionListReducer from "../features/transactionList/transactionListSlice"

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    transactionList:transactionListReducer
  },
});
