import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import alertReducer from '../features/alertMessage/alertMessageSlice';
import userReducer from '../features/userProfile/userSlice';
import transactionListReducer from "../features/transactionList/transactionListSlice";
import enterTransactionReducer from "../features/enterTransaction/enterTransactionSlice";
import calendarSlice from '../features/calendar/calendarSlice';
import categoryIconSlice from '../features/categoryIcon/categoryIconSlice';

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer,
    transactionList: transactionListReducer,
    operation: enterTransactionReducer,
    calendar: calendarSlice,
    categoryIcon: categoryIconSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
