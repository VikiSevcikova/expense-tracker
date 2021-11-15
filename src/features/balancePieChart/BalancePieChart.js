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
        borderColor: ["#282a38"],
        borderWidth: 1,
        hoverOffset: 2,
      },
    ],
    animation: {
      animateRotate: true,
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          align: "right",
        },

        title: {
            display: true,
            text: 'Custom Chart Title'
        },
      },
    },
  };

  return (
    <div>
      balancePieChart
      <Pie data={data} />
    </div>
  );
}
