import React from "react";
import "./DashBoardCards.scss";
import { Container, Col, Row } from "react-bootstrap";

import Greeting from "../greetings/Greeting";
import Calendar from "../calendar/Calendar";
import Currency from "../currency/Currency";
import BalancePieChart from "../balancePieChart/BalancePieChart";
import BalanceLineChart from "../balanceLineChart/BalanceLineChart";
import ExpenseChart from "../expenseChart/ExpenseChart";
import RecentTransaction from "../recentTransaction/RecentTransaction";

import useMedia from "use-media";

export default function DashBoardCards() {

  const mobile = useMedia({ maxWidth: 576 });

  return (
    <>
      {mobile ? (
        <>
          <Container fluid className="box_wrapper">
            <Row>
              <Greeting />
            </Row>
          </Container>
          <Container fluid className="box_wrapper--top">
            <Row>
              <Col xs={9}>
                <Calendar />
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
      ) : (
        <>
          <Container fluid>
            <Row>
              <Col xl={4}>
                <Container fluid className="box_wrapper">
                  <Greeting />
                </Container>
              </Col>
              <Col xl={8} className="top">
                <Container fluid className="box_wrapper">
                  <Row>
                    <Col xs={9}>
                      <Calendar />
                    </Col>
                    <Col xs={3}>
                      <Currency />
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>

          <Container fluid>
            <Row>
              <Col md={6}>
                <Container className="box_wrapper">
                  <BalancePieChart />
                </Container>
              </Col>
              <Col md={6}>
                <Container className="box_wrapper">
                  <ExpenseChart/>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col md={12} xl={6}>
                <Container className="box_wrapper">
                  <BalanceLineChart />
                </Container>
              </Col>
              <Col md={12} xl={6}>
                <Container className="box_wrapper">
                  <RecentTransaction />
                </Container>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
