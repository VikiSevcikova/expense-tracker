import { createSlice } from '@reduxjs/toolkit';

function getTransactionTotal(array, type) {
  let total = 0;
  array.map(transaction => {
    if (transaction.transactionType === type) {
      total += transaction.amount;
    }
  });
  return total;
}

export const transactionListSlice = createSlice({
  name: 'transactionList',
  initialState: {
    allTran: [],
    filteredTran: [],
    balance: {
      income: 0,
      expense: 0,
      total: 0,
    }
  },
  reducers: {
    getAllTransaction: (state, action) => {
      return { ...state, allTran: action.payload };
    },
    filterTransaction: (state, action) => {
      return { ...state, filteredTran: action.payload };
    },
    addTransaction: (state, action) => {
      return { ...state, allTran: [action.payload, ...state.allTran] };
    },
    updateTransaction: (state, action) => {
      return {...state, allTran: state.allTran.map(elem => elem._id === action.payload._id ? action.payload : elem)}
    },
    deleteTransaction: (state, action) => {
      return { ...state, allTran: state.allTran.filter(elem => elem._id !== action.payload._id) };
    },
    getBalance(state, action) {
      let income = getTransactionTotal(action.payload, "income");
      let expense = getTransactionTotal(action.payload, "expense");
      return {
        ...state,
        balance: {
          income: income,
          expense: expense,
          total: income - expense
        }
      };
    }
  }
});

//export reducer, actions,and state(selector)
export default transactionListSlice.reducer;
export const { getAllTransaction, checkTransaction, filterTransaction, addTransaction, updateTransaction, deleteTransaction, getBalance } = transactionListSlice.actions;
export const transactionListSelector = (state) => state.transactionList;

