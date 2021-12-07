import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { stringifyDate } from "../../utils/utils";

const startOfMonth = new Date(moment(new Date()).startOf("month").startOf("day"));
const endOfMonth = new Date(moment(new Date()).endOf("day"));

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    startDate: stringifyDate(startOfMonth),
    endDate: stringifyDate(endOfMonth),
    isFilterCleared: false
  },
  reducers: {
    setDateRange(state, action) {
      const { startDate, endDate } = action.payload;
      return {
        ...state,
        startDate: startDate,
        endDate: endDate
      };
    },
    clearDateRange(state, action) {
      return {...state, isFilterCleared:action.payload}
    },
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
export const selectCalendar = (state) => state.calendar;
