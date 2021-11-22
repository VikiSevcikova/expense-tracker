import { createSlice } from "@reduxjs/toolkit";

const recentTransactionSilce = createSlice({
  name: "recentTransaction",
  initialState: [],
  reducers: {
    getRecentTransaction (state,action)  {
      return action.payload;
    },
  },
});

export const recentTransactionActions = recentTransactionSilce.actions;
export default recentTransactionSilce.reducer;
