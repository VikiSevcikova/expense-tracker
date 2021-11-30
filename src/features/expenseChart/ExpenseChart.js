import React from "react";
import { Doughnut } from "react-chartjs-2";
import useMedia from "use-media";

export default function ExpenseChart({ allTran }) {
  const mobile = useMedia({ maxWidth: 767 });
  const medium = useMedia({ maxWidth: 878 });

  console.log(allTran);

  const dataList = [
    { name: "Food & Beverage", trans: [] },
    { name: "Shopping", trans: [] },
    { name: "Grocery", trans: [] },
    { name: "Utilities", trans: [] },
    { name: "Transport & automobiles", trans: [] },
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

  allTran.filter((tran) => {
    //  return dataList.indexOf(tran.categoryName) > -1
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

  // Get list catagory amount array
  const catagoryAmount = dataCatagory.map((label) => {
    const trans = label.trans.map((tran) => {
      return tran.amount;
    });
    const sumTrans = trans.reduce((a, b) => {
      return a + b;
    });
    return sumTrans;
  });

  // Total expense amount
  const totalAmount = catagoryAmount.reduce((a, b) => a + b, 0);

  console.log(totalAmount);
  console.log(dataCatagory);
  const chartAngle = catagoryAmount.map((amount) => {
    return 360 * (amount / totalAmount);
  });

  console.log(catagoryAmount);
  console.log(
    catagoryAmount.map((amount) => {
      return `$${amount}`;
    })
  );

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
        labels: catagorylabel,
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
      },
    ],
  };

  const desktopConfig = {
    plugins: {
      legend: {
        display: true,
        position: "right",

        labels: {
          color: "white",
          font: {
            family: "Josefin Sans, sans-serif",
            // wordWrap: "break-word",
            size: 18,
          },
        },
      },
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
            // wordWrap: "break-word",
            size: 8,
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
            size: 12,
          },
        },
      },
    },
  };

  const nodataConfig = {
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
    <div>
      <h5>ExpenseChart</h5>
      <div>
        {data.labels.length !== 0 ? (
          <Doughnut
            data={data}
            options={mobile ? mobileConfig : medium ? config : desktopConfig}
          />
        ) : (
          <Doughnut data={noData} options={nodataConfig} />
        )}
      </div>
    </div>
  );
}
