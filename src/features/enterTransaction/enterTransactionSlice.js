/* This is to handle edit, delete operation with the same modal pop-up */
import { createSlice } from '@reduxjs/toolkit';

export const enterTransactionSlice = createSlice({
  name: 'operation',
  initialState: {
    editBtnVisible: false,
    checkedItem: []
  },
  reducers: {
    changeOperation: (state, action) => {
      return action.payload
    },
  }
});

//export reducer, actions,and state(selector)
export default enterTransactionSlice.reducer;
export const { changeOperation } = enterTransactionSlice.actions;
export const enterTransactionSelector = (state) => state.operation;

