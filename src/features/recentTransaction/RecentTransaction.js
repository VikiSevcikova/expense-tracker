import React from "react";
import "./RecentTransaction.scss";
import { Row, Col } from "react-bootstrap";

export default function RecentTransaction() {
  const categories = [
    {
      id: 1,
      name: "Food & beverage",
      icon: "IoFastFoodOutline",
    },
    {
      id: 2,
      name: "Shopping",
      icon: "AiOutlineShopping",
    },
    {
      id: 3,
      name: "Grocery",
      icon: "MdOutlineShoppingCart",
    },
    {
      id: 4,
      name: "Utilities",
      icon: "IoWaterOutline",
    },
    {
      id: 5,
      name: "Transport & automobiles",
      icon: "MdOutlineTrain",
    },
  ];

  const transactionData = [
    {
      id: "xxxxxx",
      date: "11/01/2021",
      categoryId: 1,
      expense: true,
      description: "Ramen",
      currency: "CAD",
      amount: 50,
      paymentMethod: "cash",
      isDeleted: false,
    },
    {
      id: "xxxxxx",
      date: "11/07/2021",
      categoryId: 2,
      expense: false,
      description: "Clothes",
      currency: "CAD",
      amount: 500,
      paymentMethod: "credit card",
      isDeleted: false,
    },
    {
      id: "xxxxxx",
      date: "11/09/2021",
      categoryId: 3,
      expense: false,
      description: "weekly",
      currency: "CAD",
      amount: 300,
      paymentMethod: "credit card",
      isDeleted: false,
    },
    {
      id: "xxxxxx",
      date: "11/11/2021",
      categoryId: 4,
      expense: false,
      description: "gas and water",
      currency: "CAD",
      amount: 500,
      paymentMethod: "credit card",
      isDeleted: false,
    },
    {
      id: "xxxxxx",
      date: "11/13/2021",
      categoryId: 5,
      expense: false,
      description: "skytrain",
      currency: "CAD",
      amount: 10,
      paymentMethod: "compass card",
      isDeleted: false,
    },
  ];

  return (
    <div>
      <h5>RecentTransaction</h5>
      {transactionData.map((transaction, index) => {
        return (
          <>
            {/* <div className="transaction_wrap" key={index}>
                <span className="categoryicon">{transaction.categoryId}</span>
                <span className="date"> {transaction.date}</span>
                <span className="description">{transaction.description}</span>
                <span className="amount"> {transaction.amount}</span>
            </div> */}
            <Row >
              <Col xs={2}>{transaction.categoryId}</Col>
              <Col xs={3}>{transaction.date}</Col>
              <Col xs={4}> {transaction.description}</Col>
              <Col xs={3}>{transaction.amount}</Col>
              <hr/>
            </Row>
          </>
        );
      })}
    </div>
  );
}
