import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./Calendar.scss";
import "react-datepicker/dist/react-datepicker.css";
import moment, { utc } from "moment";
import { selectCalender } from "./calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "./calendarSlice";
import { getAllTransaction, getBalance } from "../transactionList/transactionListSlice";
import axios from "axios";

export default function Calendar() {
  const dispatch = useDispatch();

  const { startDate, endDate } = useSelector(selectCalender);

  // Date to ISO string converter
  const stringifyDate = (date) => {
    return date.toISOString();
  };

  // ISO string to Date converter
  const dateFromString = (date) => {
    return new Date(date);
  };

  const [calendar, setCalendar] = useState([dateFromString(startDate),dateFromString(endDate)]);

  useEffect(()=>{
    if(!calendar[1]) return;
    let dates = {
        startDate: stringifyDate(new Date(moment(calendar[0]).startOf("day"))),
        endDate: stringifyDate(new Date(moment(calendar[1]).endOf("day")))
      };

    dispatch(calendarActions.setDateRange(dates));
  },[calendar])

  useEffect( () => {
    const fetchDateRange = async () => {
      console.log("fetching data");
      try {
        // Convert to ISO date format which is
        const res = await axios.get(
          `/transaction?startdate=${startDate}&enddate=${endDate}`
        );

        if (res.status === 200) {
          //for transaction page
          dispatch(getAllTransaction(res.data));
          //for dashboard page
          dispatch(getBalance(res.data)); //pie chart
        }
      } catch (error) {
        console.error(`${error}: Something wrong on the server side`);
        return error;
      }
    };
    fetchDateRange();
  }, [startDate,endDate]);

  return (
    <div className="calendar-wrapper">
      <DatePicker
        portalId="root-portal"
        popperClassName="picker-popper"
        className="dateFilter"
        dateFormat="yyyy/MM/dd"
        monthsShown={2}
        selected={calendar[0]}
        onChange={(update) => setCalendar(update)}
        startDate={calendar[0]}
        endDate={calendar[1]}
        selectsRange={true}
      />
    </div>
  );
}
