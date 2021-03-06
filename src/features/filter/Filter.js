import React, { useState } from 'react';
import useMedia from "use-media";
import { useSelector, useDispatch } from "react-redux";
import { enterTransactionSelector } from '../enterTransaction/enterTransactionSlice';
import { transactionListSelector, filterTransaction } from '../transactionList/transactionListSlice';
import { calendarActions, selectCalendar } from '../calendar/calendarSlice';
import "./Filter.scss";
import {
  Container,
  Col,
  Row,
  Button
} from 'react-bootstrap';
import {
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

  //filter clear
  const { isFilterCleared } = useSelector(selectCalendar);

  //method
  const filterByTranType = (tranType) => {
    const filtered = transactionList.allTran.filter(e => e.transactionType === tranType);
    dispatch(filterTransaction(filtered));
  };

  const clearFilter = () => {
    dispatch(filterTransaction([]));//clear income/expense filter
    isFilterCleared ?
      dispatch(calendarActions.clearDateRange(false)) :
      dispatch(calendarActions.clearDateRange(true)); //clear date range filter, toggle state
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
                  name="income"
                  className="incomeFilter"
                  onClick={() => filterByTranType("income")}
                >
                  Income
                </Button>
              </Col>
              <Col>
                <Button
                  className="expenseFilter"
                  onClick={() => filterByTranType("expense")}
                >
                  Expense
                </Button>
              </Col>
              <Col>
                <Button
                  className="clearFilter"
                  onClick={clearFilter}
                >
                  Clear
                </Button>
              </Col>
            </Row>
            <Row className="dateRangeFilter">
              <Calendar />
            </Row>
            <Row className="buttons">
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
                onClick={() => filterByTranType("income")}
              >
                Income
              </Button>
              <Button
                className="expenseFilter"
                onClick={() => filterByTranType("expense")}
              >
                Expense
              </Button>
              <Button
                className="clearFilter"
                onClick={clearFilter}
              >
                Clear
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
