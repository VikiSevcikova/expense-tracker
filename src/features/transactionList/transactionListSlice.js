import { createSlice } from '@reduxjs/toolkit';

export const transactionListSlice = createSlice({
  name: 'transactionList',
  initialState: {},
  reducers: {
    getAllTransaction: (state, action) => {
      return action.payload;
    },
    checkTransaction: (state, action) => {
      state.map((elem, index) => elem._id == action.payload.id ? state.splice(index, 1, action.payload) : elem);
    },
    filterByTransactionType: (state, action) => {
      //alert("show income tran", action.payload);
      return action.payload;
    }
  }
});

//export reducer, actions,and state(selector)
export default transactionListSlice.reducer;
export const { getAllTransaction, checkTransaction, filterByTransactionType } = transactionListSlice.actions;
export const transactionListSelector = (state) => state.transactionList;

