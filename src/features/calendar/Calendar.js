import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./Calendar.scss";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { selectCalender } from "./calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../calendar/calendarSlice";
import {getAllTransaction} from "../transactionList/transactionListSlice";
import axios from "axios";
import { balancePieChartActions } from "../balancePieChart/balancePieChartSlice";


export default function Calendar({ setDate }) {
  // const startOfMonth = new Date(moment().startOf("month"));
  // const endOfDay = new Date(moment().endOf("day"));
  // console.log(`Start Date ${startOfMonth}`);
  // console.log(`End Date ${endOfDay}`);
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(selectCalender);
console.log(startDate, endDate)
  const [calendar, setCalendar] = useState([startDate, endDate]);

  const timeZoneOffSet = new Date().getTimezoneOffset() * 60000;
  //const [startDate, endDate] = dateRange;

  useEffect(() => {
    //  set end date time
   /* setDate(
      startDate,
      new Date(moment(endDate).set({ hour: 23, minute: 59, second: 59 }))
    );*/
    let dates = {startDate : calendar[0], endDate: calendar[1]}

    console.log(dates)
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
      //  dispatch(getAllTransaction(res.data));
       dispatch(balancePieChartActions.getAmount(res.data));
       console.log(res.data)
        
      }
    } catch (err) {
      return err;
    }
  };
  fetchDateRange();
  }, [calendar]);

  return (
    <div className="calendar-wrapper">
      <DatePicker
        portalId="root-portal"
        selected={startDate}
        onChange={(update) => setCalendar(update)}
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
      />
    </div>
  );
}
