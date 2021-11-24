import { createSlice } from "@reduxjs/toolkit";

function getTransactionTotal(array, type){
    let total = 0;
    array.map(transaction => {
        if(transaction.transactionType === type){
            total += transaction.amount;
        }
    });
    return total;
}

const balancePieChartSlice = createSlice({
  name: "balance pie chart",
  initialState: {
    balancePieChart: {
      income: 0,
      expense: 0,
      total: 0,
    },
  },
  reducers: {
    getAmount(state, action) {
        let income = getTransactionTotal(action.payload, "income");
        let expense = getTransactionTotal(action.payload, "expense");
      return {
        ...state,
        balancePieChart: {
          income: income,
          expense: expense,
          total: income - expense
        },
      };
    },
  },
});

export const balancePieChartActions = balancePieChartSlice.actions;

export default balancePieChartSlice.reducer;
