import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./Calendar.scss";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { selectCalender } from "./calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../calendar/calendarSlice";
import { getAllTransaction } from "../transactionList/transactionListSlice";
import axios from "axios";
import { balancePieChartActions } from "../balancePieChart/balancePieChartSlice";


export default function Calendar() {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(selectCalender);
  console.log(startDate, endDate);
  const [calendar, setCalendar] = useState([startDate, endDate]);

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

    console.log("before dispatch!!", dates);

    dispatch(calendarActions.setDateRange(dates));

    const fetchDateRange = async () => {
      try {
        // Convert to ISO date format which is
        const res = await axios.get(
          `/transaction?startdate=${new Date(
            calendar[0] - timeZoneOffSet
          ).toISOString()}&enddate=${new Date(
            calendar[1] - timeZoneOffSet
          ).toISOString()}`
        );
        if (res.status === 200) {
          //for transaction page
          dispatch(getAllTransaction(res.data));

          //for dashboard page
          dispatch(balancePieChartActions.getAmount(res.data)); //pie chart

          console.log(res.data);

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
