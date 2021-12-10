import { createSlice } from "@reduxjs/toolkit";

const getTransactionTotal = (array, type) => {
  let total = 0;
  array.map((transaction) => {
    if (transaction.transactionType === type) {
      total += transaction.amount;
    }
  });
  return total;
};

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
    // getBalance(state, action) {
    //   console.log(action.payload.amount);
    //   let income = getTransactionTotal(action.payload.amount, "income");
    //   let expense = getTransactionTotal(action.payload.amount, "expense");

    //   // Current rate
    //   const rate = action.payload.rate;

    //   // Previous rate
    //   const preRate = action.payload.preRate;

    //   const cadIncome = Math.round((income / preRate) * 10) / 10;
    //   const cadExpense = Math.round((expense / preRate) * 10) / 10;

    //   const convertIncome = Math.round(cadIncome * rate * 10) / 10;
    //   const convertExpense = Math.round(cadExpense * rate * 10) / 10;

    //   return {
    //     ...state,
    //     balance: {
    //       income: convertIncome,
    //       expense: convertExpense,
    //       total: convertIncome - convertExpense,
    //     },
    //     balance: {
    //       income: income,
    //       expense: expense,
    //       total: income - expense,
    //     },
    //   };
    // },
    convertRate(state, action) {
      // console.log(`Pre rate  ${action.payload.preRate}`);
      // console.log(`Rate  ${action.payload.rate}`);
      const backToCad = state.allTran.map((tran) => {
        return {
          ...tran,
          amount: Math.round((tran.amount / action.payload.preRate) * 10) / 10,
        };
      });

      return {
        ...state,
        allTran: backToCad.map((tran) => {
          return {
            ...tran,
            amount: Math.round(tran.amount * action.payload.rate * 10) / 10,
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
