import React, { useState } from 'react';
import useMedia from "use-media";
import { useSelector, useDispatch } from "react-redux";
import { enterTransactionSelector } from '../enterTransaction/enterTransactionSlice';
import { transactionListSelector, filterTransaction } from '../transactionList/transactionListSlice';
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
  MdDelete,
  MdLibraryAdd
} from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import EnterTransaction from '../enterTransaction/EnterTransaction';
import DeleteConfirmation from '../deleteConfimation/DeleteConfirmation';
import Calendar from '../calendar/Calendar';

const Filter = () => {

  //Media query
  const isLG = useMedia({ minWidth: "992px" }); //lg
  const isXL = useMedia({ minWidth: "1200px" }); //xl
  const isXXL = useMedia({ minWidth: "1400px" }); //xxl

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
    dispatch(filterTransaction(incomeTran));
  };

  const filterByExpense = () => {
    const expenseTran = transactionList.allTran.filter(e => e.transactionType === "expense");
    dispatch(filterTransaction(expenseTran));
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
              <Calendar />
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
                delete={"transaction"}
                checkedItemId={operation.checkedItem._id}
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
              <Calendar />
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
                delete={"transaction"}
                checkedItemId={operation.checkedItem._id}
                closeDelConf={closeDelConf}
                handleClose={handleClose} />}
          </>
        )}
      </Container>
    </>
  );
};

export default Filter;
