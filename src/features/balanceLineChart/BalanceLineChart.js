import React, { useCallback, useEffect, useState } from "react";
import "./BalanceLineChart.scss";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { transactionListSelector } from "../transactionList/transactionListSlice";
import { selectCalendar } from "../calendar/calendarSlice";
import moment from "moment";

export default function BalanceLineChart() {
  const { convertedTran } = useSelector(transactionListSelector);
  const { startDate, endDate } = useSelector(selectCalendar);
  const [chartData, setChartData] = useState({ dates: [], data: [] });

  const groupData = useCallback(
    (start, end, range) => {
      let dates = [];
      let data = [];
      let amount = 0;
      while (
        (start.isBefore(end) && range !== 1) ||
        (start.isSameOrBefore(end) &&
          !start.isSame(end, "month") &&
          range === 1)
      ) {
        //first run the dates array is empty,
        //but we can check if there are any transactions with the start date and add the sum to the data array
        //next run it checks if the start date is same of after the transaction date, because the start date is one day / range ahead
        //and we sum up the transactions that are before the start date
        amount = convertedTran
          .filter(
            (t) =>
              isInRange(start, t.date, range) && end.isAfter(moment(t.date))
          )
          .reduce((pv, cv) => {
            if (cv.transactionType === "income") {
              return pv + cv.amount;
            } else {
              return pv - cv.amount;
            }
          }, 0);
        data.push(amount);
        //adds the start date inside the dates array and changes the start date based on the range
        getFormatedDate(start, dates, range);
      }
      //get the last date seperately, so it is correct
      getFormatedDate(end, dates, range);
      amount = convertedTran
        .filter((t) => isInRange(end, t.date, range))
        .reduce((pv, cv) => {
          if (cv.transactionType === "income") {
            return pv + cv.amount;
          } else {
            return pv - cv.amount;
          }
        }, 0);
      data.push(amount);
      return [dates, data];
    },
    [convertedTran]
  );

  //checks
  const isInRange = (start, date, range) => {
    if (range === 1) {
      return start.isSameOrAfter(moment(date), "month");
    } else {
      return start.isSameOrAfter(moment(date));
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

  const getData = useCallback(() => {
    const start = moment(startDate).endOf("day");
    const end = moment(endDate).endOf("day");
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
  }, [startDate, endDate, groupData]);

  useEffect(() => {
    const [dates, data] = getData();
    setChartData({ dates, data });
  }, [convertedTran, getData]);

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
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // this here
        },
      },

      y: {
        color: "white",
        ticks: {
          color: "white", // this here
        },
      },
    },
  };

  return (
    <div>
      <h5>Balance Change</h5>
      <div className="chart-wrapper">
        <Line width="inherit" height="inherit" data={data} options={config} />
      </div>
    </div>
  );
}
