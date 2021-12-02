import React from "react";
import "./BalancePieChart.scss";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { transactionListSelector } from "../transactionList/transactionListSlice";

import useMedia from "use-media";

export default function BalancePieChart() {
  const mobile = useMedia({ maxWidth: 1500 });
  
  //redux
  const { balance } = useSelector(transactionListSelector);

  const data = {
    labels: [`Expense: $${balance.expense}`, `Income: $${balance.income}`],
    datasets: [
      {
        label: "balance",
        data: [90, 270],
        backgroundColor: ["#de4c4c", "#5fa43f"],
        borderColor: ["#393b49"],
        borderWidth: 5,
        hoverOffset: 2,
      },
    ],
    animation: {
      animateRotate: true,
    },
  };

  const config = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "white",
          font: {
            family: "Josefin Sans, sans-serif",
            size: 18,
          },
        },
      },
    },
  };

  const mobileConfig = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "white",
          font: {
            family: "Josefin Sans, sans-serif",
            size: 18,
          },
        },
      },
    },
  };

  return (
    <div>
      <h5>Total balance: ${balance.total}</h5>
      <Pie data={data} options={mobile ? mobileConfig : config} />
    </div>
  );
}
