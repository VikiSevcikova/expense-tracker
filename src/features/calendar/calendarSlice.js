import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";


const startOfMonth = new Date(moment().startOf("month"));
const endOfDay = new Date(moment().endOf("day"));
const timeZoneOffSet = new Date().getTimezoneOffset() * 60000;
const stringifyDate = (date) => {
  return new Date(date - timeZoneOffSet).toISOString();
};

const calendarSlice = createSlice({
  name: "calender",
  initialState: {
    startDate:stringifyDate(startOfMonth),
    endDate: stringifyDate(new Date(
      moment(endOfDay).set({ hour: 23, minute: 59, second: 59 })
    )),
  },
  reducers: {
    setDateRange(state, action) {
      console.log("state changes")
      const {startDate, endDate} = action.payload;
      console.log(startDate, endDate)
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
