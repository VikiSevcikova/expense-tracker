import React, { useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import './Calender.scss';
import "react-datepicker/dist/react-datepicker.css";

export default function Calender({setDate}) {
  const [dateRange, setDateRange] = useState([new Date(), null]);
  const [startDate, endDate] = dateRange;

  useEffect(()=>{
    if(dateRange[1] !== null){
      setDate(startDate.toISOString(),endDate.toISOString())
    }
  },[dateRange])


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
