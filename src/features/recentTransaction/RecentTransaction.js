import React, { useState, useEffect } from "react";
import "./RecentTransaction.scss";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { transactionListSelector } from "../transactionList/transactionListSlice";
import { selectCategoryIcon } from "../categoryIcon/categoryIconSlice";
import CategoryIcon from "../categoryIcon/CategoryIcon";

export default function RecentTransaction() {

  const [recentTransaction, setRecentTransaction] = useState([]);

  //redux
  const { allTran } = useSelector(transactionListSelector);
  const {categories} = useSelector(selectCategoryIcon);
  console.log(categories)

  useEffect(() => {
    //get the last 5 transactions
    const recent = allTran.slice(Math.max(allTran.length - 5,0));
    //sort them by date
    recent.sort((a,b) => new Date(b.date) - new Date(a.date));
    //set to the state
    setRecentTransaction(recent);
  }, [allTran]);

  return (
    <div>
      <h5>RecentTransaction</h5>

      {recentTransaction &&
        recentTransaction.map((transaction, index) => {
          return (
            <Row key={index}>
              <Col xs={2}>
                <CategoryIcon size={20} id={transaction.categoryId} type={transaction.transactionType} />
              </Col>
              <Col xs={3}>{transaction.date.substring(2, 10)}</Col>
              <Col xs={4}>
                <p className="description">{transaction.description}</p>
              </Col>
              <Col xs={3}>
                <p className="amount">
                  {transaction.transactionType === "expense" ? "-" : null}
                  {transaction.amount}
                </p>
              </Col>
              <hr />
            </Row>
          );
        })}
    </div>
  );
}
