import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./Calendar.scss";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function Calendar({ setDate }) {
  const startOfMonth = new Date(moment().startOf("month"));
  const endOfDay = new Date(moment().endOf("day"));
  // console.log(`Start Date ${startOfMonth}`);
  // console.log(`End Date ${endOfDay}`);

  const [dateRange, setDateRange] = useState([startOfMonth, endOfDay]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    //  set end date time
    setDate(
      startDate,
      new Date(moment(endDate).set({ hour: 23, minute: 59, second: 59 }))
    );
  }, [dateRange]);

  return (
    <div className="calendar-wrapper">
      <DatePicker
        portalId="root-portal"
        selected={startDate}
        onChange={(update) => setDateRange(update)}
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
      />
    </div>
  );
}
