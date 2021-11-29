import React from "react";
import { Doughnut } from "react-chartjs-2";
import useMedia from "use-media";

export default function ExpenseChart({ allTran }) {
  const mobile = useMedia({ maxWidth: 767 });
  const medium = useMedia({ maxWidth: 850 });

  console.log(allTran);

  const sortArray = [];

  const test = allTran.filter((tran) => {
    return tran.categoryName === "Education";
  });

  console.log(test);

  const size = {
    desktop: 12,
    device: 9,
  };

  // const dataList = [
  //   { Foodbeverage: [] },
  //   { Shopping: [] },
  //   "Grocery",
  //   "Utilities",
  //   "Transport & automobiles",
  //   "Insurance",
  //   "Medical",
  //   "Travel",
  //   "Housing",
  //   "Mobile",
  //   "Leisure",
  //   "Education",
  //   "Investment",
  //   "other",
  // ];

  const data = {
    labels: [
      "Food & beverage",
      "Shopping",
      "Grocery",
      "Utilities",
      "Transport & automobiles",
      "Insurance",
      "Medical",
      "Travel",
      "Housing",
      "Mobile",
      "Leisure",
      "Education",
      "Investment",
      "other",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [50, 30, 60, 45, 70, 15, 5, 12, 7, 15, 10, 10, 20, 11],
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
            size: 12,
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

  return (
    <div>
      <h5>ExpenseChart</h5>
      <div>
        <Doughnut
          data={data}
          options={mobile ? mobileConfig : medium ? config : desktopConfig}
        />
      </div>
    </div>
  );
}
