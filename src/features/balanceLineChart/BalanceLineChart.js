import React, { useEffect, useState } from "react";
import "./BalanceLineChart.scss";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  transactionListSelector,
} from "../transactionList/transactionListSlice";
import { selectCalendar } from "../calendar/calendarSlice";
import moment from "moment";

export default function BalanceLineChart() {
  const { allTran } = useSelector(transactionListSelector);
  const { startDate, endDate } = useSelector(selectCalendar);
  const [chartData, setChartData] = useState({ dates: [], data: [] });

  const getData = () => {
    const start = moment(startDate).endOf('day');
    const end = moment(endDate).endOf('day');
    const days = end.diff(start, "days");
    if (days > 90) {
      //show by months
      return groupData(start, end, 1);
    } else if (days > 30 && days <= 90) {
      //show by 3 weeks
      return groupData(start, end, 3);
    } else {
      //show by days
      return groupData(start, end);
    }
  };

  const groupData = (start, end, range) => {
    let dates = [];
    let data = [];
    let amount = 0;
    while ((start.isBefore(end) && range !== 1) || (start.isSameOrBefore(end) && !start.isSame(end, 'month') && range === 1)) {
      amount = allTran
        .filter(
          (t) =>
            isInRange(start, t.date, range) && end.isAfter(moment(t.date))
        )
        .reduce(
          (pv, cv) => {
            if (cv.transactionType === "income") {
              return pv + cv.amount;
            } else {
              return pv - cv.amount;
            }
          },
          0
        );
      data.push(amount);
      getFormatedDate(start, dates, range);
    }

    getFormatedDate(end, dates, range);
    amount = allTran
      .filter(
        (t) => isInRange(end, t.date, range)
      )
      .reduce(
        (pv, cv) => {
          if (cv.transactionType === "income") {
            return pv + cv.amount;
          } else {
            return pv - cv.amount;
          }
        },
        0
      );
    data.push(amount);
    return [dates, data];
  };

  const isInRange = (start, date, range) => {
    if(range === 1){
      return start.isSameOrAfter(moment(date), 'month') 
    }else{
      return start.isSameOrAfter(moment(date))
    }
  };

  const getFormatedDate = (start, dates, range) => {
    switch (range) {
      case 1: {
        dates.push(moment(start).format("MMM YYYY"));
        start.add(1, "month");
        break;
      }
      case 3: {
        dates.push(moment(start).format("YYYY/MM/DD"));
        start.add(3, "weeks");
        break;
      }
      default: {
        dates.push(moment(start).format("YYYY/MM/DD"));
        start.add(1, "days");
        break;
      }
    }
  };

  useEffect(() => {
    const [dates, data] = getData();
    setChartData({ dates, data });
  }, [allTran]);

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: chartData.dates,
    datasets: [
      {
        axis: "y",
        label: "Balance",
        data: chartData.data,
        fill: false,
        backgroundColor: ["white"],
        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        color: "white",
      },
      y: {
        color: "white",
      },
    },
  };

  return (
    <div>
      <h5>Balance Change</h5>
      <Line data={data} options={config} />
    </div>
  );
}
