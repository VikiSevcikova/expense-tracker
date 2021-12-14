import React from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import useMedia from "use-media";
import { transactionListSelector } from "../transactionList/transactionListSlice";
import { selectUser } from "../userProfile/userSlice";
import "./ExpenseChart.scss";

export default function ExpenseChart() {
  const mobile = useMedia({ maxWidth: 767 });
  const medium = useMedia({ maxWidth: 1200 });
  const { convertedTran } = useSelector(transactionListSelector);
  const { currency } = useSelector(selectUser);
  const symbol = currency.symbol;

  // Array to store the transaction record by catagory
  const dataList = [
    { name: "Food & Beverage", trans: [] },
    { name: "Shopping", trans: [] },
    { name: "Grocery", trans: [] },
    { name: "Utilities", trans: [] },
    { name: "Transport & Automobiles", trans: [] },
    { name: "Insurance", trans: [] },
    { name: "Medical", trans: [] },
    { name: "Travel", trans: [] },
    { name: "Housing", trans: [] },
    { name: "Mobile", trans: [] },
    { name: "Leisure", trans: [] },
    { name: "Education", trans: [] },
    { name: "Investment", trans: [] },
    { name: "Other", trans: [] },
    { name: "Salary", trans: [] },
  ];

  // Filter all transaction and push to the list
  convertedTran.filter((tran) => {
    dataList.forEach((list) => {
      if (
        list.name === tran.categoryName &&
        tran.transactionType === "expense"
      ) {
        list.trans.push(tran);
      }
    });
    return tran
  });

  // Filter and delete the lists if no transaction
  const dataCatagory = dataList.filter((label) => {
    return label.trans.length !== 0;
  });

  // Get the list catagory label
  const catagorylabel = dataCatagory.map((label) => {
    return label.name;
  });

  // An array of expense amount in different catagory
  const catagoryAmount = dataCatagory.map((label) => {
    const trans = label.trans.map((tran) => {
      return tran.amount;
    });
    const sumTrans = trans.reduce((a, b) => {
      return a + b;
    });
    return sumTrans;
  });

  // Calculate the percentage for each expense
  const percentage = (amount) => {
    const totalExpense = catagoryAmount.reduce((a, b) => {
      return a + b;
    }, 0);
    return Math.round((amount / totalExpense) * 100);
  };

  // =====================================================================================
  // Chartjs

  // Genarate Chart legend labels
  const legendLabels = function (chart) {
    let data = chart.data;
    const color = data.datasets[0].backgroundColor;

    return data.labels.map((label, i) => {
      return {
        text: `${label}: ${symbol}${data.datasets[0].data[i]} - ${percentage(
          data.datasets[0].data[i]
        )}%`,
        fillStyle: color[i],
      };
    });
  };

  // Chartjs data (when it's no data)
  const noData = {
    labels: ["no data"],
    datasets: [
      {
        labels: "no data",
        data: [360],
        backgroundColor: ["#191a24c8"],
        borderWidth: 0,
        font: {
          size: 15,
        },
      },
    ],
  };

  // Chartjs data
  const data = {
    labels: catagorylabel,
    datasets: [
      {
        data: catagoryAmount,
        backgroundColor: [
          "#a1bfa3",
          "#78a1a3",
          "#d9dcd1",
          "#f2f1c5",
          "#e4d7a3",
          "#a1bfa3",
          "#78a1a3",
          "#d9dcd1",
          "#f2f1c5",
          "#e4d7a3",
          "#a1bfa3",
          "#78a1a3",
          "#d9dcd1",
          "#f2f1c5",
        ],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  };

  // Chart config for desktop view
  const desktopConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        boxWidth: 30,
        boxHeight: 30,
        bodyFont: {
          size: 16,
          family: "Josefin Sans, sans-serif",
        },
        callbacks: {
          label: function (item) {
            return `${item.label}: ${symbol}${
              item.dataset.data[item.dataIndex]
            }`;
          },
        },
      },
      legend: {
        display: true,
        position: "right",
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

  // Chart config for normal view
  const config = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "white",
          font: {
            family: "Josefin Sans, sans-serif",
            size: 16,
          },
        },
      },
      tooltip: {
        boxWidth: 30,
        boxHeight: 30,
        bodyFont: {
          size: 16,
          family: "Josefin Sans, sans-serif",
        },
        callbacks: {
          label: function (item) {
            return `${item.label}: ${symbol}${
              item.dataset.data[item.dataIndex]
            }`;
          },
        },
      },
    },
  };

  // Chart config for mobile
  const mobileConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",

        labels: {
          color: "white",

          font: {
            family: "Josefin Sans, sans-serif",
            size: 16,
          },
        },
      },
      tooltip: {
        boxWidth: 30,
        boxHeight: 30,
        bodyFont: {
          size: 16,
          family: "Josefin Sans, sans-serif",
        },
        callbacks: {
          label: function (item) {
            return `${item.label}: ${symbol}${
              item.dataset.data[item.dataIndex]
            }`;
          },
        },
      },
    },
  };

  // Chart config for no data
  const nodataConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "No transaction records this date range",
        color: "white",
        font: {
          size: 16,
        },
      },

      legend: {
        display: false,
        position: "bottom",

        labels: {
          color: "white",

          font: {
            family: "Josefin Sans, sans-serif",
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="chart">
      <h5>ExpenseChart</h5>
      <div className="chart-wrapper">
        {data.labels.length !== 0 ? (
          <Doughnut
            width="inherit"
            height="inherit"
            data={data}
            options={mobile ? mobileConfig : medium ? config : desktopConfig}
          />
        ) : (
          <Doughnut
            height="inherit"
            width="inherit"
            data={noData}
            options={nodataConfig}
          />
        )}
      </div>
    </div>
  );
}
