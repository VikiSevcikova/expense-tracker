import React, { useState, useEffect } from 'react';
import useMedia from "use-media";
import { useSelector, useDispatch } from "react-redux";
import { enterTransactionSelector } from '../enterTransaction/enterTransactionSlice';
import { transactionListSelector, filterByTransactionType } from '../transactionList/transactionListSlice';
import {
  showAlert,
  hideAlert
} from '../alertMessage/alertMessageSlice';
import "./Filter.scss";
import {
  Container,
  Col,
  Row,
  Button
} from 'react-bootstrap';
import { BsCalendarDateFill, BsSearch } from "react-icons/bs";
import {
  MdPayment,
  MdModeEdit,
  MdDelete,
  MdLibraryAdd
} from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EnterTransaction from '../enterTransaction/EnterTransaction';
import DeleteConfirmation from '../deleteConfimation/DeleteConfirmation';
import moment from "moment";

const Filter = () => {

  //Media query
  const isLG = useMedia({ minWidth: "992px" }); //lg
  const isXL = useMedia({ minWidth: "1200px" }); //xl
  const isXXL = useMedia({ minWidth: "1400px" }); //xxl

  const timeZoneOffSet = new Date().getTimezoneOffset() * 60000;
  const startOfMonth = new Date(moment().startOf("month"));
  const endOfDay = new Date(moment().endOf("day"));
  //const [dateRange, setDateRange] = useState([startOfMonth, endOfDay]);
  const [dateRange, setDateRange] = useState([startOfMonth, endOfDay]);
  const [startDate, endDate] = dateRange;

  //Modal pop up (enter transaction)
  const [show, setShow] = useState(false);
  const [operationType, setOperationType] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (operation) => {
    setOperationType(operation);//edit or add
    setShow(true); //open modal
  };

  //Modal pop up (delete conf)
  const [delConf, setShowDelConf] = useState(false);
  const closeDelConf = () => setShowDelConf(false);
  const showDelConf = () => setShowDelConf(true);

  //redux
  const dispatch = useDispatch();
  const operation = useSelector(enterTransactionSelector);
  const transactionList = useSelector(transactionListSelector);

  //method
  const filterByIncome = () => {
    const incomeTran = transactionList.allTran.filter(e => e.transactionType === "income");
    dispatch(filterByTransactionType(incomeTran));
  };

  const filterByExpense = () => {
    const expenseTran = transactionList.allTran.filter(e => e.transactionType === "expense");
    dispatch(filterByTransactionType(expenseTran));
  };

  const changeDateRange = (input) => {

    setDateRange(input);
    if (input[1] != null) {
      const dtRange = [input[0], new Date(moment(input[1]).set({ hour: 23, minute: 59, second: 59 }))];
      setDateRange(dtRange);
    }
  };

  const filterByDate = () => {

    //validation check - dateRange not selected
    if (dateRange[0] === null || dateRange[1] === null) {
      dispatch(showAlert({ message: "Please select date range", variant: "danger" }));
    } else {
      const start = dateRange[0] - timeZoneOffSet;
      const end = dateRange[1] - timeZoneOffSet;

      const trans = transactionList.allTran.filter(elem => new Date(start).toISOString() <= elem.date && elem.date <= new Date(end).toISOString());

      if (trans.length === 0) {
        dispatch(showAlert({ message: "No transaction found", variant: "danger" }));
      } else {
        dispatch(filterByTransactionType(trans));
      };
    }
  };

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
                  onClick={filterByIncome}
                >
                  Income
                </Button>
              </Col>
              <Col>
                <Button
                  className="expenseFilter"
                  onClick={filterByExpense}
                >
                  Expense
                </Button>
              </Col>
            </Row>

            <Row className="dateRangeFilter">
              <DatePicker
                portalId="root-portal"
                className="dateFilter"
                dateFormat="yyyy/MM/dd"
                monthsShown={2}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={updatedDate => changeDateRange(updatedDate)}
              />
              <Button
                className="searchBtn"
                onClick={filterByDate}
              >
                <BsSearch className="searchIcon" />
              </Button>
            </Row>

            <Row className="buttons">
              <BsCalendarDateFill />
              <MdPayment />
              <MdLibraryAdd
                className="addNewBtn"
                onClick={() => handleShow("add")} />
              {operation.editDelBtnVisible &&
                <>
                  <MdModeEdit
                    className="editBtn"
                    onClick={() => handleShow("edit")} />
                  <MdDelete
                    className="deleteBtn"
                    onClick={showDelConf} />
                </>
              }
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
                checkedItemId={operation.checkedItem[0]._id}
                closeDelConf={closeDelConf}
                handleClose={handleClose} />}
          </>
        ) : (
          <>
            {/* Desktop view */}
            <Col className="filterOptionsDesktop">
              <Button
                className="incomeFilter"
                onClick={filterByIncome}
              >
                Income
              </Button>
              <Button
                className="expenseFilter"
                onClick={filterByExpense}
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
                onChange={updatedDate => changeDateRange(updatedDate)}
              />
              <Button
                className="searchBtn"
                onClick={filterByDate}
              >
                <BsSearch className="searchIcon" />
              </Button>
            </Col>

            <Col className="buttonsDesktop">
              <Button
                className="addNewBtn"
                onClick={() => handleShow("add")}
              >
                Add
              </Button>
              {operation.editDelBtnVisible &&
                <>
                  <Button
                    className="editBtn"
                    onClick={() => handleShow("edit")}
                  >
                    Edit
                  </Button>
                  <Button
                    className="deleteBtn"
                    onClick={showDelConf}
                  >
                    Delete
                  </Button>
                </>
              }
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
                checkedItemId={operation.checkedItem[0]._id}
                closeDelConf={closeDelConf}
                handleClose={handleClose} />}
          </>
        )}
      </Container>
    </>
  );
};

export default Filter;
