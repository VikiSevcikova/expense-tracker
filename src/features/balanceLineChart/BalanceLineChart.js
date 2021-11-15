import React from "react";
import "./BalanceLineChart.scss";
import { Line } from "react-chartjs-2";

export default function BalanceLineChart() {
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
    labels: MONTHS,
    datasets: [
      {
        axis: "y",
        label: "My First Dataset",
        data: [
          1000, 0, 2000, 1000, 2000, 3000, 4000, 7000, 2000, 5000, 8000, 9000,
        ],
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
        color: 'white'
      },
      y: {
        color: 'white'
      }
  }
  };

  return (
    <div>
      <h5>Balance Change</h5>
      <Line data={data} options={config} />
    </div>
  );
}
