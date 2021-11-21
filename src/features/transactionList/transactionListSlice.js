import { createSlice } from '@reduxjs/toolkit';

export const transactionListSlice = createSlice({
  name: 'transactionList',
  initialState: {
    allTran: [],
    filteredTran: []
  },
  reducers: {
    getAllTransaction: (state, action) => {
      return { ...state, allTran: action.payload };
    },
    checkTransaction: (state, action) => {
      console.log(action);
      state.allTran.map((elem, index) => elem._id == action.payload.id ? state.allTran.splice(index, 1, action.payload) : elem);
    },
    filterByTransactionType: (state, action) => {
      return { ...state, filteredTran: action.payload };
    }
  }
});

//export reducer, actions,and state(selector)
export default transactionListSlice.reducer;
export const { getAllTransaction, checkTransaction, filterByTransactionType } = transactionListSlice.actions;
export const transactionListSelector = (state) => state.transactionList;

