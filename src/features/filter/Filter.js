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
import EditTransaction from '../editTransaction/EditTransaction';

const Filter = () => {

  //Media query
  const isLG = useMedia({ minWidth: "992px" }); //lg
  const isXL = useMedia({ minWidth: "1200px" }); //xl
  const isXXL = useMedia({ minWidth: "1400px" }); //xxl

  //Calendar filter
  const [dateRange, setDateRange] = useState([new Date(), null]);
  const [startDate, endDate] = dateRange;

  //Modal pop up
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                  portalId="root-portal"
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
                <MdModeEdit className="editBtn" onClick={handleShow} />
                <MdDelete className="deleteBtn" />
              </Col>
            </Row>
            {/* Modal */}
            {show && <EditTransaction show={show} handleClose={handleClose} />}
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
                onClick={handleShow}
              >
                Edit
              </Button>
              <Button
                className="deleteBtn"
              >
                Delete
              </Button>
            </Col>
            {/* Modal */}
            {show && <EditTransaction show={show} handleClose={handleClose} />}
          </>
        )}
      </Container>


    </>
  );
};

export default Filter;
