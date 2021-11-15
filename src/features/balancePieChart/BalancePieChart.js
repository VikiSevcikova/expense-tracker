import React from "react";
import "./BalancePieChart.scss";
import { Pie } from "react-chartjs-2";

export default function BalancePieChart() {
  const data = {
    labels: ["Expense: $1000", "Income: $4000"],
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
      legend:{
        position:'right'
      }
    },
  };

  return (
    <div>
      <Pie data={data} options={config}/>
    </div>
  );
}
