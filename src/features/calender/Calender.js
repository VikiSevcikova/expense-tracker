import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './Calender.scss';
import "react-datepicker/dist/react-datepicker.css";

export default function Calender() {
  const [dateRange, setDateRange] = useState([new Date(), null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="calender-wrapper">
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
