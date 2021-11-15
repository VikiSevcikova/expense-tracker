import React from "react";
import "./Dashboard.scss";
import { Container, Col, Row, Button } from "react-bootstrap";
import Greeting from "../../features/greetings/Greeting";
import Calender from "../../features/calender/Calender";
import Currency from "../../features/currency/Currency";
import BalancePieChart from "../../features/balancePieChart/BalancePieChart";
import BalanceLineChart from "../../features/balanceLineChart/BalanceLineChart";
import ExpenseChart from "../../features/expenseChart/ExpenseChart";
import RecentTransaction from "../../features/recentTransaction/RecentTransaction";

export default function Dashboard() {
  return (
    <div className="dashBoard_wrapper">
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
    </div>
  );
}
