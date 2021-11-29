import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./DashBoardCards.scss";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../calendar/calendarSlice";
import { balancePieChartActions } from "../balancePieChart/balancePieChartSlice";
import { getAllTransaction } from "../transactionList/transactionListSlice";

import Greeting from "../greetings/Greeting";
import Calendar from "../calendar/Calendar";
import Currency from "../currency/Currency";
import BalancePieChart from "../balancePieChart/BalancePieChart";
import BalanceLineChart from "../balanceLineChart/BalanceLineChart";
import ExpenseChart from "../expenseChart/ExpenseChart";
import RecentTransaction from "../recentTransaction/RecentTransaction";

export default function DashBoardCards() {
  const dateRangeTransactions = useSelector(
    (state) => state.calender.dateRange
  );

  return (
    <>
      <Container fluid className="box_wrapper">
        <Row>
          <Greeting />
          {/* // testing area */}
          {dateRangeTransactions && (
            <>
              {dateRangeTransactions.map((tran, index) => {
                return (
                  <div key={index}>
                    <p>
                      {tran.date}
                      {tran.description}
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </Row>
      </Container>
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
