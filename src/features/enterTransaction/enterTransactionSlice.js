/* This is to handle edit, delete operation with the same modal pop-up */
import { createSlice } from '@reduxjs/toolkit';

export const enterTransactionSlice = createSlice({
  name: 'operation',
  initialState: { editMode: false },
  reducers: {
    changeOperation: (state, action) => {
      return { ...state, editMode: action.payload };
    },
  }
});

//export reducer, actions,and state(selector)
export default enterTransactionSlice.reducer;
export const { changeOperation } = enterTransactionSlice.actions;
export const enterTransactionSelector = (state) => state.operation;

