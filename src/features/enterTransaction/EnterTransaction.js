import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, filterTransaction, updateTransaction } from '../transactionList/transactionListSlice';
import { changeOperation } from '../enterTransaction/enterTransactionSlice';
import "./EnterTransaction.scss";
import {
  Container,
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import { FaTimesCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  showAlert
} from '../alertMessage/alertMessageSlice';
import DeleteConfirmation from '../deleteConfimation/DeleteConfirmation';
import { selectUser } from '../userProfile/userSlice';
import { selectCategoryIcon } from '../categoryIcon/categoryIconSlice';
import { getHeaderConfig } from '../../utils/utils';

const EditTransaction = (props) => {

  //redux
  const dispatch = useDispatch();
  const { token } = useSelector(selectUser);
  const { categories } = useSelector(selectCategoryIcon);

  //private state
  const [transaction, setTransaction] = useState({
    date: new Date(),
    categoryId: 0, //default 0 : need to get from backend
    categoryName: "",
    transactionType: "expense",
    description: "",
    currency: "CAD",
    amount: 0,
    paymentMethod: "",
    isDeleted: false,
    isEditing: false,
  });

  //Modal pop up (delete conf)
  const [delConf, setShowDelConf] = useState(false);
  const closeDelConf = () => setShowDelConf(false);
  const showDelConf = () => setShowDelConf(true);

  //method
  //prefill edit form
  useEffect(() => {
    if (props.operationType === "edit") {
      setTransaction({
        _id: props.checkedItem._id,
        date: props.checkedItem.date.substr(0, 10).replace(/-/g, "/"),
        categoryId: props.checkedItem.categoryId,
        categoryName: props.checkedItem.categoryName,
        transactionType: props.checkedItem.transactionType,
        description: props.checkedItem.description,
        currency: props.checkedItem.currency,
        amount: props.checkedItem.amount,
        paymentMethod: props.checkedItem.paymentMethod,
        isDeleted: props.checkedItem.isDeleted,
        isEditing: props.checkedItem.isEditing,
      });
    }
  }, [props.operationType]);

  //onChange
  const handleChange = (prop) => (e) => {
    //get category id based on category name;
    if (prop === "categoryName") {
      const targetCategory = categories.find(elem => elem.name === e.target.value);
      setTransaction(
        {
          ...transaction,
          ["categoryId"]: targetCategory._id,
          [prop]: e.target.value
        }
      );
    } else {
      setTransaction({ ...transaction, [prop]: e.target.value });
    }
  };

  //onSubmit -- save
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      //validation check
      if (transaction.transactionType === "" || transaction.categoryName === "" || transaction.amount === 0 || transaction.paymentMethod === "") {
        dispatch(showAlert({
          message: "Please fill in all the required fields",
          variant: "danger"
        }));
        return;
      } else {
        let response;
        {
          props.operationType === "edit" ?
            //send data to backend - edit tran
            response = await axios.post(`/alltransaction/update/${props.checkedItem._id}`, transaction, getHeaderConfig(token)) :
            //send data to backend - add new
            response = await axios.post("/alltransaction/add", transaction, getHeaderConfig(token));
        }
        if (response.statusText !== "OK") {
          throw response.statusText;
        } else {

          //close modal pop-up
          props.handleClose();

          //hide edit and delete button and remove checked
          dispatch(changeOperation({
            editDelBtnVisible: false,
            checkedItem: {}
          }));

          //clear all filter
          dispatch(filterTransaction([]));

          //update allTran in reducer
          {
            props.operationType === "edit" ?
              dispatch(updateTransaction(response.data)) :
              dispatch(addTransaction(response.data));
          }

          //show confirmation message
          {
            props.operationType === "edit" ?
              dispatch(
                showAlert({
                  message: "Transaction has successfully been edited",
                  variant: "info",
                })
              ) :
              dispatch(
                showAlert({
                  message: "Transaction has successfully been added",
                  variant: "info",
                })
              );
          }
        }
      }
    } catch (error) {
      dispatch(
        showAlert({
          message: "Sorry, something went wrong on the server side",
          variant: "danger",
        })
      );
      console.error(`${error}: Something wrong on the server side`);
      return error;
    }
  };

  return (
    <>
      <Modal
        className="editModal"
        show={props.show}
        centered
        onHide={props.handleClose}
      >
        <Container fluid className="editTransactionContainer">
          {/* Header */}
          <Modal.Header>
            {props.operationType === "add" ?
              <Modal.Title as="h1">Add New Transaction</Modal.Title> :
              <Modal.Title as="h1">Edit Transaction</Modal.Title>}
            <FaTimesCircle
              className="modalClsBtn"
              onClick={props.handleClose} />
          </Modal.Header>

          {/* Body */}
          <Modal.Body>
            <Form
              className="editForm"
              onSubmit={handleSubmit}>
              <Form.Group className="transactionType">
                <Form.Check
                  type="radio"
                  value="income"
                  checked={transaction.transactionType === "income" && true}
                  label="Income"
                  onChange={handleChange("transactionType")} />
                <Form.Check
                  type="radio"
                  value="expense"
                  checked={transaction.transactionType === "expense" && true}
                  label="Expense"
                  onChange={handleChange("transactionType")} />
              </Form.Group>

              <Container fluid>
                <Form.Group className="transactionDate">
                  <Form.Label>Choose a Date *</Form.Label>
                  <DatePicker
                    required
                    selected={new Date(transaction.date)}
                    onChange={(selectedDate) => setTransaction({ ...transaction, date: selectedDate })}
                  />
                </Form.Group>

                <Form.Group className="transactionCategory">
                  <Form.Label>Select a Category *</Form.Label>
                  <Form.Select
                    required
                    defaultValue="Choose..."
                    value={transaction.categoryName}
                    onChange={handleChange("categoryName")}>
                    <option>Choose...</option>
                    {categories.map((elem, index) => (
                      <>
                        <option key={index}>{elem.name}</option>
                      </>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="transactionAmount" >
                  <Form.Label>Enter an Amount *</Form.Label>
                  <Form.Control
                    required type="text"
                    placeholder="$"
                    value={transaction.amount}
                    onFocus={() => setTransaction({ ...transaction, ["amount"]: "" })}
                    onChange={handleChange("amount")} />
                </Form.Group>

                <Form.Group className="transactionDescription" >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter item description..."
                    value={transaction.description}
                    onFocus={() => setTransaction({ ...transaction, ["description"]: "" })}
                    onChange={handleChange("description")} />
                </Form.Group>
              </Container>

              <Form.Group className="paymentMethod">
                <Form.Label>Payment Method *</Form.Label>
                <Form.Check
                  type="radio"
                  label="Debit Card"
                  value="Debit Card"
                  checked={transaction.paymentMethod === "Debit Card" && true}
                  onChange={handleChange("paymentMethod")} />
                <Form.Check
                  type="radio"
                  label="Credit Card"
                  value="Credit Card"
                  checked={transaction.paymentMethod === "Credit Card" && true}
                  onChange={handleChange("paymentMethod")} />
                <Form.Check
                  type="radio"
                  label="Cash"
                  value="Cash"
                  checked={transaction.paymentMethod === "Cash" && true}
                  onChange={handleChange("paymentMethod")} />
              </Form.Group>

              <Container className="buttons">
                <Button className="saveBtn" type="submit">Save</Button>
                {/* Delete button only visible when editing the transaction */}
                {props.operationType === "edit" &&
                  <Button
                    className="deleteBtn"
                    onClick={showDelConf}>Delete</Button>}
                {delConf &&
                  <DeleteConfirmation
                    show={delConf}
                    delete={"transaction"}
                    closeDelConf={closeDelConf}
                    checkedItemId={transaction._id}
                    handleClose={props.handleClose} />}
              </Container>
            </Form>
          </Modal.Body>
        </Container>
      </Modal>
    </>
  );
};

export default EditTransaction;
