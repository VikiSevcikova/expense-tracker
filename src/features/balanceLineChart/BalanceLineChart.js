import React, { useEffect, useState } from "react";
import "./BalanceLineChart.scss";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  getBalance,
  transactionListSelector,
} from "../transactionList/transactionListSlice";
import { selectCalendar } from "../calendar/calendarSlice";
import moment from "moment";

export default function BalanceLineChart() {
  const { allTran } = useSelector(transactionListSelector);
  const { startDate, endDate } = useSelector(selectCalendar);
  const [chartData, setChartData] = useState({ dates: [], data: [] });

  const getData = () => {
    const start = moment(startDate);
    const end = moment(endDate);
    const days = end.diff(start, "days");
    console.log(days);
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
    console.log("range", range);
    let dates = [];
    let data = [];
    let amount = 0;
    getFormatedDate(start, dates, range);
    while (start < end) {
      getFormatedDate(start, dates, range);
      let currentDate = start;
      console.log("current", currentDate.format("DD-MM-YYYY"));
      console.log("start", start.format("DD-MM-YYYY"));
      console.log("end", end.format("DD-MM-YYYY"));
      const array = allTran.filter((t) => {
        return isInRange(start, t.date, range)&& end.format("YYY-MM-DD") > moment(t.date).format("YYYY-MM-DD")
      });
      console.log(array);
      amount = allTran
        .filter(
          (t) =>
            start.endOf("day") >= moment(t.date) &&
            end.format("YYY-MM-DD") > moment(t.date).format("YYYY-MM-DD")
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
      console.log(amount);
      data.push(amount);

      console.log("data", data);
      console.log("dates", dates);
    }

    getFormatedDate(start, dates, range);
    const array = allTran.filter((t) => end.format("YYYY-MM-DD") >= moment(t.date).format("YYYY-MM-DD"));
    console.log(array);
    amount = allTran
      .filter(
        (t) => end.format("YYYY-MM-DD") >= moment(t.date).format("YYYY-MM-DD")
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

    console.log("dates", dates);
    console.log("data", data);
    return [dates, data];
  };

  const isInRange = (start, date, range) => {
    let endDate = start.clone();
    switch (range) {
      case 1:
        return start.endOf("day") >= moment(date);
      case 3:
        return start.endOf("day") >= moment(date);
      default:
        return start.format("YYYY-MM-DD") >= moment(date).format("YYYY-MM-DD");
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
        console.log("getFormatDate", start.format("YYYY/MM/DD"));
        dates.push(moment(start).format("YYYY/MM/DD"));
        start.add(3, "weeks");
        console.log("getFormatDate", start.format("YYYY/MM/DD"));
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
