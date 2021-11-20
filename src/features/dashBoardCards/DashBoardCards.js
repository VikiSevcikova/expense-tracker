import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./DashBoardCards.scss";
import { Container, Col, Row } from "react-bootstrap";

import Greeting from "../greetings/Greeting";
import Calender from "../calender/Calender";
import Currency from "../currency/Currency";
import BalancePieChart from "../balancePieChart/BalancePieChart";
import BalanceLineChart from "../balanceLineChart/BalanceLineChart";
import ExpenseChart from "../expenseChart/ExpenseChart";
import RecentTransaction from "../recentTransaction/RecentTransaction";

export default function DashBoardCards() {
  // local time offset
  const timeZoneOffSet = new Date().getTimezoneOffset() * 60000;

  // First date of current month
  const startOfMonth = new Date(moment().startOf("month"));

  // Today endtime 23:59:59
  const endOfDay = new Date(moment().endOf("day"));

  // console.log(startOfMonth);
  // console.log(endOfDay);

  const [data, setData] = useState(undefined);
  const [startDate, setStartDate] = useState(startOfMonth);
  const [endDate, setEndDate] = useState(endOfDay);

  const setDate = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const fetchDateRange = async () => {
      try {
        // Convert to ISO date format which is 
        const res = await axios.get(
          `http://localhost:5000/transaction?startdate=${new Date(
            startDate - timeZoneOffSet
          ).toISOString()}&enddate=${new Date(
            endDate - timeZoneOffSet
          ).toISOString()}`
        );
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (err) {
        return err;
      }
    };
    fetchDateRange();
  }, [startDate, endDate]);

  // useEffect(() => {
  //   const fetchRecent = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/all-transaction");
  //       if (res.status === 200) {
  //         setData(res.data);
  //       }
  //     } catch (err) {
  //       return err;
  //     }
  //   };
  //   fetchRecent();
  // }, []);

  console.log(data);

  return (
    <>
      <Container fluid className="box_wrapper">
        <Row>
          <Greeting />
          {/* // testing area */}
          {data && (
            <>
              {data.map((tran, index) => {
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
            <Calender setDate={setDate} />
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
