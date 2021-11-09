import React, { useState } from 'react';
import useMedia from "use-media";
import "./Filter.scss";
import {
  Container,
  Col,
  Row,
  Button
} from 'react-bootstrap';
import { BsCalendarDateFill } from "react-icons/bs";
import {
  MdPayment,
  MdModeEdit,
  MdDelete
} from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filter = () => {

  //Calendar filter
  const [dateRange, setDateRange] = useState([new Date(), null]);
  const [startDate, endDate] = dateRange;

  //Media query
  const isSM = useMedia({ minWidth: "576px" }); //sm landscape
  const isMD = useMedia({ minWidth: "768px" }); //md
  const isLG = useMedia({ minWidth: "992px" }); //lg
  const isXL = useMedia({ minWidth: "1200px" }); //xl
  const isXXL = useMedia({ minWidth: "1400px" }); //xxl

  return (
    <>
      <Container fluid className="filterContainer">

        {!(isLG || isXL || isXXL) ? (
          <>
            {/* Mobile and Tablet view */}
            <Row className="filterOptions">
              <Col>
                <Button
                  className="incomeFilter"
                >
                  Income
                </Button>
              </Col>
              <Col>
                <Button
                  className="expenseFilter"
                >
                  Expense
                </Button>
              </Col>
            </Row>

            <Row className="buttons">
              <Col
                xs={5} sm={5} md={5}
                className="filterColLeft">
                <DatePicker
                  className="dateFilter"
                  dateFormat="yyyy/MM/dd"
                  monthsShown={2}
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                />
              </Col>
              <Col className="filterColCenter">
                <BsCalendarDateFill />
                <MdPayment />
              </Col>
              <Col className="filterColRight">
                <MdModeEdit className="editBtn" />
                <MdDelete className="deleteBtn" />
              </Col>
            </Row>
          </>
        ) : (
          <>
            {/* Desktop view */}
            <Col className="filterOptionsDesktop">
              <Button
                className="incomeFilter"
              >
                Income
              </Button>
              <Button
                className="expenseFilter"
              >
                Expense
              </Button>
              <DatePicker
                className="dateFilter"
                dateFormat="yyyy/MM/dd"
                monthsShown={2}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
              />
            </Col>

            <Col className="buttonsDesktop">
              <Button
                className="editBtn"
              >
                Edit
              </Button>
              <Button
                className="deleteBtn"
              >
                Delete
              </Button>
            </Col>
          </>
        )}
      </Container>


    </>
  );
};

export default Filter;
