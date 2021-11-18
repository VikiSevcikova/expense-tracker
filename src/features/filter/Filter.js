import React, { useState } from 'react';
import useMedia from "use-media";
import { useSelector } from "react-redux";
import { enterTransactionSelector } from '../enterTransaction/enterTransactionSlice';
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
import EnterTransaction from '../enterTransaction/EnterTransaction';
import DeleteConfirmation from '../deleteConfimation/DeleteConfirmation';

const Filter = () => {

  //Media query
  const isLG = useMedia({ minWidth: "992px" }); //lg
  const isXL = useMedia({ minWidth: "1200px" }); //xl
  const isXXL = useMedia({ minWidth: "1400px" }); //xxl

  //Calendar filter
  const [dateRange, setDateRange] = useState([new Date(), null]);
  const [startDate, endDate] = dateRange;

  //Modal pop up (enter transaction)
  const [show, setShow] = useState(false);
  const [operationType, setOperationType] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (operation) => {
    setOperationType(operation);
    setShow(true);
  };

  //Modal pop up (delete conf)
  const [delConf, setShowDelConf] = useState(false);
  const closeDelConf = () => setShowDelConf(false);
  const showDelConf = () => setShowDelConf(true);

  //redux
  const operation = useSelector(enterTransactionSelector);
  console.log("in filter.js", operation);

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
                <MdModeEdit
                  className="addNewBtn"
                  onClick={() => handleShow("add")} />
                {operation.editMode &&
                  <MdModeEdit
                    className="editBtn"
                    onClick={() => handleShow("edit")} />
                }
                <MdDelete
                  className="deleteBtn"
                  onClick={showDelConf} />
              </Col>
            </Row>
            {/* Modal */}
            {show &&
              <EnterTransaction show={show}
                operationType={operationType}
                checkedItem={operation.checkedItem}
                handleClose={handleClose} />}
            {delConf &&
              <DeleteConfirmation
                show={delConf}
                checkedItem={operation.checkedItem}
                closeDelConf={closeDelConf} />}
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

            <Col className="buttonsDesktop">
              <Button
                className="addNewBtn"
                onClick={() => handleShow("add")}
              >
                Add
              </Button>
              {operation.editMode &&
                <Button
                  className="editBtn"
                  onClick={() => handleShow("edit")}
                >
                  Edit
                </Button>}
              <Button
                className="deleteBtn"
                onClick={showDelConf}
              >
                Delete
              </Button>
            </Col>
            {/* Modal */}
            {show &&
              <EnterTransaction
                show={show}
                operationType={operationType}
                checkedItem={operation.checkedItem}
                handleClose={handleClose} />}
            {delConf &&
              <DeleteConfirmation
                show={delConf}
                checkedItem={operation.checkedItem}
                closeDelConf={closeDelConf} />}
          </>
        )}
      </Container>
    </>
  );
};

export default Filter;
