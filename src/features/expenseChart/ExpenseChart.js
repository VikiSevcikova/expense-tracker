import React from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import useMedia from "use-media";
import { transactionListSelector } from "../transactionList/transactionListSlice";
import { selectUser } from "../userProfile/userSlice";
import { rateConverter } from "../../utils/CurrencyLabel";
import "./ExpenseChart.scss";
import CategoryIcon from "../categoryIcon/CategoryIcon";
import { AiFillAccountBook } from "react-icons/ai";
import * as ReactIcons from "react-icons/all";
import { Col } from "react-bootstrap";

export default function ExpenseChart() {
  const mobile = useMedia({ maxWidth: 767 });
  const medium = useMedia({ maxWidth: 1200 });
  const { allTran } = useSelector(transactionListSelector);
  const { currency } = useSelector(selectUser);
  const rate = currency.rate;
  const symbol = currency.symbol;

  // console.log(allTran);

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

  // make it more dynamic
  // get categories and create array from the list

  allTran.filter((tran) => {
    dataList.forEach((list) => {
      if (
        list.name === tran.categoryName &&
        tran.transactionType === "expense"
      ) {
        list.trans.push(tran);
      }
    });
  });

  // Filter out the lists if no transaction
  const dataCatagory = dataList.filter((label) => {
    return label.trans.length !== 0;
  });

  // Get the list catagory label
  const catagorylabel = dataCatagory.map((label) => {
    return label.name;
  });

  // const chartLabel = dataCatagory.map((label) => {
  //   return label.name
  // });

  const catagoryAmount = dataCatagory.map((label) => {
    const trans = label.trans.map((tran) => {
      return tran.amount;
    });
    const sumTrans = trans.reduce((a, b) => {
      return a + b;
    });

    // exchange rates
    // return rateConverter(sumTrans, rate);
    return sumTrans;
  });

  const percentage = (amount) => {
    const totalExpense = catagoryAmount.reduce((a, b) => {
      return a + b;
    }, 0);
    return Math.round((amount / totalExpense) * 100);
  };

  const legendLabels = function (chart) {
    let data = chart.data;
    const color = data.datasets[0].backgroundColor;

    return data.labels.map((label, i) => {
      return {
        text: `${label} ${percentage(data.datasets[0].data[i])}%
   ${(
     <CategoryIcon size={20} id={data.labels.indexOf(label)} type={label} />
   )}`,
        fillStyle: color[i],
      };
    });
  };

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

  const data = {
    labels: catagorylabel,
    datasets: [
      {
        // labels: chartLabel,
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

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "white",
          font: {
            family: "Josefin Sans, sans-serif",
            size: 8,
          },
        },
      },
      tooltip: {
        boxWidth: 10,
        boxHeight: 10,
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
            size: 12,
          },
        },
      },
    },
  };

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
        <Doughnut height="inherit" width="inherit" data={noData} options={nodataConfig} />
      )}
      </div>

    </div>
  );
}
