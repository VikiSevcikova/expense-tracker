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
  const tablet = useMedia({ maxWidth: 980 });

  return (
      <Container fluid className={!tablet && "dashboard-wrapper"}>
        <Row className="align-items-center mx-1">
          <Col xs={12} xl={4} className="box_wrapper name mb-0">
              <Greeting />
          </Col>
          <Col xs={12} xl={8}>
            <Row className="mt-3 mb-0 p-2">
              <Col xs={9}>
                <Calendar />
              </Col>
              <Col xs={3}>
                <Currency />
              </Col>
            </Row>
          </Col>
        </Row>
        {tablet ? (
          <>
            <Row>
              <Col xs={12} md={6} lg={4}>
                <div className="box_wrapper">
                  <BalancePieChart />
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="box_wrapper">
                  <ExpenseChart />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className="box_wrapper ">
                  <BalanceLineChart />
                </div>
              </Col>
              <Col xs={12}>
                <div className="box_wrapper">
                  <RecentTransaction />
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col xs={12} lg={6} xl={4}>
              <Col>
                <div className="box_wrapper">
                  <BalancePieChart />
                </div>
              </Col>
              <Col>
                <div className="box_wrapper">
                  <BalanceLineChart />
                </div>
              </Col>
            </Col>
            <Col xs={12} lg={6} xl={8}>
              <Col>
                <div className="box_wrapper ">
                  <ExpenseChart />
                </div>
              </Col>
              <Col>
                <div className="box_wrapper">
                  <RecentTransaction />
                </div>
              </Col>
            </Col>
          </Row>
        )}
      </Container>
  );
}
