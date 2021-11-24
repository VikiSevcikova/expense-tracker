import React from "react";
import "./BalancePieChart.scss";
import { Pie } from "react-chartjs-2";

export default function BalancePieChart({amount}) {

  console.log(amount)

  const data = {
    labels: [`Expense: $${amount.expense}`, `Income: $${amount.income}`],
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
      },
      // title:{
      //   display: true,
      //   text:"Total balance: $3000"

      // }
    },
  };

  return (
    <div>
      <h5>Total balance: ${amount.total}</h5>
      <Pie data={data} options={config}/>
    </div>
  );
}
