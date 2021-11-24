import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";


const startOfMonth = new Date(moment().startOf("month"));
const endOfDay = new Date(moment().endOf("day"));

const calendarSlice = createSlice({
  name: "calender",
  initialState: {
    startDate: startOfMonth,
    endDate: new Date(
      moment(endOfDay).set({ hour: 23, minute: 59, second: 59 })
    ),
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
