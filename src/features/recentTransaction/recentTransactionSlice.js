import { createSlice } from "@reduxjs/toolkit";

const recentTransactionSilce = createSlice({
  name: "recentTransaction",
  initialState: {recentTransaction: []},
  reducers: {
    getRecentTransaction (state, action)  {
      return {...state, recentTransaction:action.payload};
    },
  },
});

export const recentTransactionActions = recentTransactionSilce.actions;
export default recentTransactionSilce.reducer;
