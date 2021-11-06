import React, { useState } from 'react';
import "./Filter.scss";
import {
  Container,
  Col,
  Button
} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filter = () => {

  //Calendar filter
  const [dateRange, setDateRange] = useState([new Date(), null]);
  const [startDate, endDate] = dateRange;

  return (
    <>
      <Container className="filterContainer">
        <Col className="filterOptions">
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

        <Col className="buttons">
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
      </Container>


    </>
  );
};

export default Filter;
