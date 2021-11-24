import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./DashBoardCards.scss";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../calendar/calendarSlice";
import { balancePieChartActions } from "../balancePieChart/balancePieChartSlice";
import {getAllTransaction} from "../transactionList/transactionListSlice";

import Greeting from "../greetings/Greeting";
import Calendar from "../calendar/Calendar";
import Currency from "../currency/Currency";
import BalancePieChart from "../balancePieChart/BalancePieChart";
import BalanceLineChart from "../balanceLineChart/BalanceLineChart";
import ExpenseChart from "../expenseChart/ExpenseChart";
import RecentTransaction from "../recentTransaction/RecentTransaction";

export default function DashBoardCards() {
  const dispatch = useDispatch();
  const dateRangeTransactions = useSelector((state) => state.calender.dateRange);
  const balancePieTransactions = useSelector((state)=> state.balancePieChart.balancePieChart)

  console.log(dateRangeTransactions);
  console.log(balancePieTransactions);

  // local time offset
  const timeZoneOffSet = new Date().getTimezoneOffset() * 60000;

  // First date of current month
  const startOfMonth = new Date(moment().startOf("month"));

  // Today endtime 23:59:59
  const endOfDay = new Date(moment().endOf("day"));

  const [startDate, setStartDate] = useState(startOfMonth);
  const [endDate, setEndDate] = useState(endOfDay);

  const setDate = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    // const fetchDateRange = async () => {
    //   try {
    //     // Convert to ISO date format which is
    //     const res = await axios.get(
    //       `/transaction?startdate=${new Date(
    //         startDate - timeZoneOffSet
    //       ).toISOString()}&enddate=${new Date(
    //         endDate - timeZoneOffSet
    //       ).toISOString()}`
    //     );
    //     if (res.status === 200) {
    //       dispatch(getAllTransaction(res.data));
    //       // dispatch(balancePieChartActions.getAmount(res.data));
    //       // console.log(res.data)
          
    //     }
    //   } catch (err) {
    //     return err;
    //   }
    // };
    // fetchDateRange();
  }, [startDate, endDate]);

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
            <Calendar setDate={setDate} />
          </Col>
          <Col xs={3}>
            <Currency />
          </Col>
        </Row>
      </Container>
      <Container fluid className="box_wrapper">
        <BalancePieChart amount={balancePieTransactions}/>
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
