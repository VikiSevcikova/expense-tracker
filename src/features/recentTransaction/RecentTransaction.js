import React, { useState, useEffect } from "react";
import "./RecentTransaction.scss";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { transactionListSelector } from "../transactionList/transactionListSlice";
import CategoryIcon from "../categoryIcon/CategoryIcon";
import {selectUser} from "../userProfile/userSlice";
import moment from "moment";

export default function RecentTransaction() {

  const [recentTransaction, setRecentTransaction] = useState([]);
  //redux
  const { convertedTran } = useSelector(transactionListSelector);
  const { currency } = useSelector(selectUser);
  const symbol = currency.symbol
  
  useEffect(() => {
    //get the last 5 transactions
    const recent = convertedTran.slice(Math.max(convertedTran.length - 5,0));
    //sort them by date
    recent.sort((a,b) => new Date(b.date) - new Date(a.date));
    //set to the state
    setRecentTransaction(recent);
  }, [convertedTran]);

  return (
    <>
      <h5>RecentTransaction</h5>
      <Row className={`recent-transactions-wrapper ${recentTransaction.length === 0 ? 'align-items-center' : ''}`}>
      {(recentTransaction.length === 0) && 
        <h5>No Transaction</h5>
      }
      <Col className="my-3 mx-md-3">
        {recentTransaction &&
          recentTransaction.map((transaction, index) => {
            return (
              <Row key={index}>
                <Col xs={2}>
                  <CategoryIcon size={20} id={transaction.categoryId} type={transaction.transactionType} />
                </Col>
                <Col xs={3}>{moment(transaction.date).format("YY-MM-DD")}</Col>
                <Col xs={4}>
                  <p className="description">{transaction.description}</p>
                </Col>
                <Col xs={3}>
                  <p className="amount">
                  {symbol} {transaction.transactionType === "expense" ? "-" : null}
                  {transaction.amount.toFixed(0)}
                  </p>
                </Col>
                <hr />
              </Row>
            );
          })}
        </Col>
      </Row>
    </>
  );
}
