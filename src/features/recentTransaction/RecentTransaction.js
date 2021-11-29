import React, { useState, useEffect } from "react";
import "./RecentTransaction.scss";
import { Row, Col } from "react-bootstrap";
import CategoriesIcon from "../../utils/CategoriesIcon";
import { useSelector } from "react-redux";
import { transactionListSelector } from "../transactionList/transactionListSlice";

export default function RecentTransaction() {
  const { allTran } = useSelector(transactionListSelector);
  const [recentTransaction, setRecentTransaction] = useState([]);

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
                <CategoriesIcon size={20} id={transaction.categoryId} />
              </Col>
              <Col xs={3}>{transaction.date.substring(2, 10)}</Col>
              <Col xs={4}>
                <p className="description">{transaction.description}</p>
              </Col>
              <Col xs={3}>
                <p className="amount">
                  {transaction.transactionType === "income" ? "+ " : null}
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
