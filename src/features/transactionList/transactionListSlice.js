import { createSlice } from '@reduxjs/toolkit';

export const transactionListSlice = createSlice({
  name: 'transactionList',
  initialState: {},
  reducers: {
    getAllTransaction: (state, action) => {
      return action.payload;
    },
  }
});

//export reducer, actions,and state(selector)
export default transactionListSlice.reducer;
export const { getAllTransaction } = transactionListSlice.actions;
export const transactionListSelector = (state) => state.transactionList;

