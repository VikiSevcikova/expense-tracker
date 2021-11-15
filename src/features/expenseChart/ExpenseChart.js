import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function ExpenseChart() {
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
        data: [50, 30, 60,45,70,15,5,12,7,15,10,10,20,11],
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

  const config = {
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div>
     <h5>ExpenseChart</h5>
      <Doughnut data={data} options={config} />
    </div>
  );
}
