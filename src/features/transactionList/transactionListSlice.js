import { createSlice } from "@reduxjs/toolkit";

const sortTranByDateASC = (allTranList, payload) => {
  //add payload to the list then sort
  const tranList = [...allTranList, payload];
  const sortedTran = tranList.sort(
    (a, b) => new Date(a["date"]) - new Date(b["date"])
  );
  return sortedTran;
};

export const transactionListSlice = createSlice({
  name: "transactionList",
  initialState: {
    allTran: [],
    filteredTran: [],
    convertedTran: [],
    currentPageTran: [],
    balance: {
      income: 0,
      expense: 0,
      total: 0,
    },
  },
  reducers: {
    getAllTransaction: (state, action) => {
      return { ...state, allTran: action.payload };
    },
    filterTransaction: (state, action) => {
      return { ...state, filteredTran: action.payload };
    },
    getCurrentPageTransaction: (state, action) => {
      return { ...state, currentPageTran: action.payload };
    },
    addTransaction: (state, action) => {
      return {
        ...state,
        allTran: sortTranByDateASC(state.allTran, action.payload),
      };
    },
    updateTransaction: (state, action) => {
      return {
        ...state,
        allTran: state.allTran.map((elem) =>
          elem._id === action.payload._id ? action.payload : elem
        ),
      };
    },
    deleteTransaction: (state, action) => {
      return {
        ...state,
        allTran: state.allTran.filter(
          (elem) => elem._id !== action.payload._id
        ),
      };
    },
    convertRate(state, action) {
      return {
        ...state,
        convertedTran: state.allTran.map((tran) => {
          return {
            ...tran,
            amount: Math.round(tran.amount * action.payload.rate),
          };
        }),
      };
    },
  },
});

//export reducer, actions,and state(selector)
export default transactionListSlice.reducer;
export const {
  getAllTransaction,
  checkTransaction,
  filterTransaction,
  getCurrentPageTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getBalance,
  convertRate,
} = transactionListSlice.actions;
export const transactionListSelector = (state) => state.transactionList;
