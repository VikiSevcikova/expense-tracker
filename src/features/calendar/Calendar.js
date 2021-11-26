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

  // Local time offset
  const timeZoneOffSet = new Date().getTimezoneOffset() * 60000;

  // Date to ISO string converter
  const stringifyDate = (date) => {
    return new Date(date - timeZoneOffSet).toISOString();
  };

  // ISO string to Date converter
  const dateFromString = (date) => {
    return new Date(moment.utc(date) + timeZoneOffSet);
  };

  const [calendar, setCalendar] = useState([dateFromString(startDate), dateFromString(endDate)]);

  console.log(new Date(
    moment(calendar[1]).set({ hour: 23, minute: 59, second: 59 })
  ));

  useEffect(async () => {
    let dates;

    if (calendar[1] !== null) {
      dates = {
        startDate: stringifyDate(calendar[0]),
        endDate: stringifyDate(new Date(
          moment(calendar[1]).set({ hour: 23, minute: 59, second: 59 })
        ))
      };
    } else {
      dates = {
        startDate: stringifyDate(calendar[0]),
        endDate: stringifyDate(calendar[1]),
      };
    }

    dispatch(calendarActions.setDateRange(dates));

    const fetchDateRange = async () => {
      console.log("fetching data");
      try {
        // Convert to ISO date format which is
        const res = await axios.get(
          `/transaction?startdate=${dates.startDate}&enddate=${dates.endDate}`
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
        selected={calendar[0]}
        onChange={(update) => setCalendar(update)}
        startDate={calendar[0]}
        endDate={calendar[1]}
        selectsRange={true}
      />
    </div>
  );
}
