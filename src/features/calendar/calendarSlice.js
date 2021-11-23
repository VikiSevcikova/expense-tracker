import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calender",
  initialState: {dateRange: []},
  reducers: {
    setDateRange(state, action) {
      return { ...state, dateRange: action.payload };
    },
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
