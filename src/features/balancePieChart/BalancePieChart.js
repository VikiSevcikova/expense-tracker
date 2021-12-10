import React from "react";
import "./BalancePieChart.scss";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { transactionListSelector } from "../transactionList/transactionListSlice";
import { selectUser } from "../userProfile/userSlice";
import { rateConverter } from "../../utils/CurrencyLabel";

import useMedia from "use-media";

export default function BalancePieChart() {
  const mobile = useMedia({ maxWidth: 1500 });

  //redux
  const { currency } = useSelector(selectUser);
  const { balance } = useSelector(transactionListSelector);
  const rate = currency.rate;
  const symbol = currency.symbol;

  const data = {
    labels: [`Expense`, `Income`],
    labelText: "[[percents]]%",
    datasets: [
      {
        label: "balance",
        data: [
          rateConverter(balance.expense, rate),
          rateConverter(balance.income, rate),
        ],
        backgroundColor: ["#de4c4c", "#5fa43f"],
        borderColor: ["#393b49"],
        borderWidth: 0,
        hoverOffset: 2,
      },
    ],
    animation: {
      animateRotate: true,
    },
  };

  const tooltip = {
    boxWidth: 30,
    boxHeight: 30,
    bodyFont: {
      size: 16,
      family: "Josefin Sans, sans-serif",
    },
    callbacks: {
      label: function (item) {
        return `${item.label}: ${symbol}${item.dataset.data[item.dataIndex]}`;
      },
    },
  };

  const legendLabels = function (chart) {
    let data = chart.data;
    const color = data.datasets[0].backgroundColor;
    return data.labels.map((item, i) => {
      return {
        text: `${item}: ${symbol}${data.datasets[0].data[i]}`,
        fillStyle: color[i],
      };
    });
  };

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20
  },
    plugins: {
      tooltip: tooltip,
      legend: {
        display: true,
        position: "right",
        labels: {
          margin:0,
          color: "white",
          font: {
            family: "Josefin Sans, sans-serif",
            size: 18,
          },
          generateLabels: legendLabels,
        },
      },
    },
  };

  const mobileConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: tooltip,
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "white",
          font: {
            family: "Josefin Sans, sans-serif",
            size: 18,
          },
          generateLabels: legendLabels,
        },
      },
    },
  };

  return (
    <div>
      <h5>
        Total balance: {symbol}
        {rateConverter(balance.total, rate)}
      </h5>
      <div className="chart-wrapper">
         <Pie width="inherit" height="inherit" data={data} options={mobile ? mobileConfig : config} />
      </div>
    </div>
  );
}
