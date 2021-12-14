import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./Calendar.scss";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { selectCalendar } from "./calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "./calendarSlice";
import { getAllTransaction, filterTransaction } from "../transactionList/transactionListSlice";
import axios from "axios";
import { selectUser } from "../userProfile/userSlice";
import { dateFromString, getHeaderConfig, stringifyDate } from "../../utils/utils";
import { showAlert } from "../alertMessage/alertMessageSlice";
import useMedia from "use-media";

const Calendar = (props) => {
  const mobile = useMedia({ maxWidth: 580 });

  //redux
  const dispatch = useDispatch();
  const { token } = useSelector(selectUser);
  const { startDate, endDate, isFilterCleared } = useSelector(selectCalendar);
  const [calendar, setCalendar] = useState([dateFromString(startDate), dateFromString(endDate)]);

  useEffect(() => {
    if (!calendar[1]) return;
    let dates = {
      startDate: stringifyDate(new Date(moment(calendar[0]).startOf("day"))),
      endDate: stringifyDate(new Date(moment(calendar[1]).endOf("day")))
    };

    dispatch(calendarActions.setDateRange(dates));
  }, [calendar, dispatch]);

  //clear filter on transaction list
  useEffect(() => {
    // toggle state
    const initialStartOfMonth = new Date(moment(new Date()).startOf("month").startOf("day"));
    const initialEndOfMonth = new Date(moment(new Date()).endOf("day"));
    const initialDateRange = {
      startDate: stringifyDate(initialStartOfMonth),
      endDate: stringifyDate(initialEndOfMonth),
    };
    setCalendar([
      dateFromString(initialDateRange.startDate),
      dateFromString(initialDateRange.endDate)
    ]);//reset display calendar
    dispatch(calendarActions.setDateRange(initialDateRange)); //clear date range filter
  }, [isFilterCleared,dispatch]);

  useEffect(() => {

    const fetchDateRange = async () => {

      //whenever date rage is changed all filters will be cleared
      dispatch(filterTransaction([]));

      try {
        const res = await axios.get(
          `/transaction?startdate=${startDate}&enddate=${endDate}`,
          getHeaderConfig(token)
        );

        if (res.status === 200) {
          //for transaction page
          dispatch(getAllTransaction(res.data));
          //for dashboard page
          // dispatch(getBalance(res.data)); //pie chart
          // dispatch(getBalance({amount:allTran,rate:currency.rate,preRate:currency.preRate})); //pie chart
        }
      } catch (error) {
        dispatch(showAlert({ message: "Something wrong on the server side", variant: "danger" }));
        console.error(`${error}: Something wrong on the server side`);
        return error;
      }
    };
    fetchDateRange();
  }, [startDate, endDate, token, dispatch]);

  return (
    <div className="calendar-wrapper">
      <DatePicker
        portalId="root-portal"
        popperClassName="picker-popper"
        className={`dateFilter ${props.className}`}
        dateFormat="yyyy/MM/dd"
        monthsShown={mobile ? 1: 2}
        selected={calendar[0]}
        onChange={(update) => setCalendar(update)}
        startDate={calendar[0]}
        endDate={calendar[1]}
        selectsRange={true}
      />
    </div>
  );
};

export default Calendar;