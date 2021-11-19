import React, {useState, useEffect} from "react";
import axios from 'axios';
import "./DashBoardCards.scss";
import { Container, Col, Row, Button } from "react-bootstrap";

import Greeting from "../greetings/Greeting";
import Calender from "../calender/Calender";
import Currency from "../currency/Currency";
import BalancePieChart from "../balancePieChart/BalancePieChart";
import BalanceLineChart from "../balanceLineChart/BalanceLineChart";
import ExpenseChart from "../expenseChart/ExpenseChart";
import RecentTransaction from "../recentTransaction/RecentTransaction";

export default function DashBoardCards() {

  const [data, setData] = useState(undefined);
  console.log(data);
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get("http://localhost:5000/all-transaction");
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (err) {
        return err;
      }
    };
    fetchRecent();
  }, []);

  console.log(data)


  return (
    <>
      <Container fluid className="box_wrapper">
        <Row>
          <Greeting />
        </Row>
      </Container>
      <Container fluid className="box_wrapper">
        <Row>
          <Col xs={9}>
            <Calender />
          </Col>
          <Col xs={3}>
            <Currency />
          </Col>
        </Row>
      </Container>
      <Container fluid className="box_wrapper">
        <BalancePieChart />
      </Container>
      <Container fluid className="box_wrapper">
        <BalanceLineChart />
      </Container>
      <Container fluid className="box_wrapper">
        <ExpenseChart />
      </Container>
      <Container fluid className="box_wrapper">
        <RecentTransaction />
      </Container>
    </>
  );
}
