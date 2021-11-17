import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../features/alertMessage/alertMessageSlice';
import userReducer from '../features/userProfile/userSlice';
import transactionListReducer from "../features/transactionList/transactionListSlice";
import enterTransactionReducer from "../features/enterTransaction/enterTransactionSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer,
    transactionList: transactionListReducer,
    operation: enterTransactionReducer
  },
});
