import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";


const startOfMonth = new Date(moment(new Date()).startOf("month").startOf("day"));
const endOfMonth = new Date(moment(new Date()).endOf("day"));

const calendarSlice = createSlice({
  name: "calender",
  initialState: {
    startDate: startOfMonth,
    endDate: endOfMonth,
  },
  reducers: {
    setDateRange(state, action) {
      const {startDate, endDate} = action.payload;
      return {
        ...state,
        startDate: startDate,
        endDate: endDate
      };
    },
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
export const selectCalender = (state) => state.calender;
