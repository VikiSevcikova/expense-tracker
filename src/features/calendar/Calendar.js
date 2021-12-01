import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./Calendar.scss";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { selectCalender } from "./calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "./calendarSlice";
import { getAllTransaction, getBalance, filterTransaction } from "../transactionList/transactionListSlice";
import axios from "axios";
import { selectUser } from "../userProfile/userSlice";

export default function Calendar() {
  const dispatch = useDispatch();
  const { token} = useSelector(selectUser);

  const { startDate, endDate } = useSelector(selectCalender);

  // Date to ISO string converter
  const stringifyDate = (date) => {
    return date.toISOString();
  };

  // ISO string to Date converter
  const dateFromString = (date) => {
    return new Date(date);
  };

  const [calendar, setCalendar] = useState([dateFromString(startDate), dateFromString(endDate)]);

  useEffect(() => {
    if (!calendar[1]) return;
    let dates = {
      startDate: stringifyDate(new Date(moment(calendar[0]).startOf("day"))),
      endDate: stringifyDate(new Date(moment(calendar[1]).endOf("day")))
    };

    dispatch(calendarActions.setDateRange(dates));
  }, [calendar]);

  useEffect(() => {

    const fetchDateRange = async () => {

      //whenever date rage is changed all filters will be cleared
      dispatch(filterTransaction([]));

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        // Convert to ISO date format which is
        const res = await axios.get(
          `/transaction?startdate=${startDate}&enddate=${endDate}`,
          config
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
  }, [startDate, endDate]);

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
