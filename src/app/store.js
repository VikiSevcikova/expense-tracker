import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../features/alertMessage/alertMessageSlice';
import transactionListReducer from "../features/transactionList/transactionListSlice";
import enterTransactionReducer from "../features/enterTransaction/enterTransactionSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    transactionList: transactionListReducer,
    operation: enterTransactionReducer
  },
});
