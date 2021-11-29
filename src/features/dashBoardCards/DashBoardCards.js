import React, { useState, useEffect } from "react";

import moment from "moment";
import "./DashBoardCards.scss";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Greeting from "../greetings/Greeting";
import Calendar from "../calendar/Calendar";
import Currency from "../currency/Currency";
import BalancePieChart from "../balancePieChart/BalancePieChart";
import BalanceLineChart from "../balanceLineChart/BalanceLineChart";
import ExpenseChart from "../expenseChart/ExpenseChart";
import RecentTransaction from "../recentTransaction/RecentTransaction";

import {transactionListSelector} from "../transactionList/transactionListSlice"

import useMedia from "use-media";

export default function DashBoardCards() {


  const balancePieTransactions = useSelector(
    (state) => state.balancePieChart.balancePieChart
  );

  const {allTran} = useSelector(transactionListSelector)


  // local time offset
  const timeZoneOffSet = new Date().getTimezoneOffset() * 60000;

  // First date of current month
  const startOfMonth = new Date(moment().startOf("month"));

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
          <Container fluid className="box_wrapper">
            <Row>
              <Col xs={9}>
                <Calendar
                //  setDate={setDate}
                />
              </Col>
              <Col xs={3}>
                <Currency />
              </Col>
            </Row>
          </Container>
          <Container fluid className="box_wrapper">
            <BalancePieChart amount={balancePieTransactions} />
          </Container>
          <Container fluid className="box_wrapper">
            <BalanceLineChart />
          </Container>
          <Container fluid className="box_wrapper">
            <ExpenseChart allTran={allTran}/>
          </Container>
          <Container fluid className="box_wrapper">
            <RecentTransaction />
          </Container>
        </>
      ) : (
        <>
          <p>Big then mobile</p>
          <Container fluid>
            <Row>
              <Col xl={4}>
                <Container fluid className="box_wrapper">
                  <Greeting />
               
                </Container>
              </Col>
              <Col xl={8}>
                <Container fluid className="box_wrapper">
                  <Row>
                    <Col xs={9}>
                      <Calendar
                      //  setDate={setDate}
                      />
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
                  <BalancePieChart amount={balancePieTransactions} />
                </Container>
              </Col>
              <Col md={6}>
                <Container className="box_wrapper">
                  <ExpenseChart allTran={allTran} />
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
