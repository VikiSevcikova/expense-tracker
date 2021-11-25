import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./Calendar.scss";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { selectCalender } from "./calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "./calendarSlice";
import { getAllTransaction } from "../transactionList/transactionListSlice";
import axios from "axios";
import { balancePieChartActions } from "../balancePieChart/balancePieChartSlice";


export default function Calendar() {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(selectCalender);
  const [calendar, setCalendar] = useState([startDate, endDate]);

  console.log("Calendar.js date range is", startDate, endDate);

  const timeZoneOffSet = new Date().getTimezoneOffset() * 60000;

  useEffect(async () => {
    let dates;

    //set end date to include 23:59:59
    if (calendar[1] !== null) {
      dates = {
        startDate: calendar[0],
        endDate: new Date(moment(calendar[1]).set({ hour: 23, minute: 59, second: 59 }))
      };
    } else {
      dates = {
        startDate: calendar[0],
        endDate: calendar[1]
      };
    }

    dispatch(calendarActions.setDateRange(dates));

    const fetchDateRange = async () => {
      console.log("fetching data")
      try {
        // Convert to ISO date format which is
        const res = await axios.get(
          `/transaction?startdate=${new Date(
            dates.startDate - timeZoneOffSet
          ).toISOString()}&enddate=${new Date(
            dates.endDate - timeZoneOffSet
          ).toISOString()}`
        );
        if (res.status === 200) {
          //for transaction page
          dispatch(getAllTransaction(res.data));

          //for dashboard page
          dispatch(balancePieChartActions.getAmount(res.data)); //pie chart

        }
      } catch (error) {
        console.error(`${error}: Something wrong on the server side`);
        return error;
      }
    };
    fetchDateRange();

  }, [calendar]);


  return (
    <div className="calendar-wrapper">
      <DatePicker
        portalId="root-portal"
        className="dateFilter"
        dateFormat="yyyy/MM/dd"
        monthsShown={2}
        selected={startDate}
        onChange={update => setCalendar(update)}
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
      />
    </div>
  );
}
