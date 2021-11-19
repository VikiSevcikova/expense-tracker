import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecentTransaction.scss";
import { Row, Col } from "react-bootstrap";
import CategoriesIcon from "../../utils/CategoriesIcon";

import { getRecentTransaction } from "./recentTransactionSlice";

export default function RecentTransaction() {
  const [data, setData] = useState(undefined);
  console.log(data);
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get("http://localhost:5000/recent-transaction");
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (err) {
        return err;
      }
    };
    fetchRecent();
  }, []);

  return (
    <div>
      <h5>RecentTransaction</h5>

      {data &&
        data.map((transaction, index) => {
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
