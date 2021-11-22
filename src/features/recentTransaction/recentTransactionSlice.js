import { createSlice } from "@reduxjs/toolkit";

const recentTransactionSilce = createSlice({
  name: "recentTransaction",
  initialState: {},
  reducers: {
    getRecentTransaction: (state) => {
      return state;
    },
  },
});

export const recentTransactionActions = recentTransactionSilce.actions;
export default recentTransactionSilce.reducer;
