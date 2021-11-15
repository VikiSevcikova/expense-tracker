import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import "./EditTransaction.scss";
import {
  Container,
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import { FaTimesCircle } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  showAlert,
  hideAlert
} from '../alertMessage/alertMessageSlice';

const EditTransaction = (props) => {

  console.log(props);//coming from filter.js

  const dispatch = useDispatch();

  //Calendar filter
  const [date, setDate] = useState(new Date());

  //checkbox choices
  const [trxType, setTrxType] = useState({});

  //private state
  const [transaction, setTransaction] = useState({
    transactionType: "",
    categoryName: "",
    date: date,
    amount: 0,
    description: "",
    paymentMethod: ""
  });

  //method
  const handleChange = (prop) => (e) => {
    setTransaction({ ...transaction, [prop]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transaction);

    //validation check
    if (transaction.transactionType === "" || transaction.categoryName === "" || transaction.amount === 0 || transaction.paymentMethod === "") {
      setTimeout(() => {
        dispatch(hideAlert());
      }, 5000);
      dispatch(showAlert({ message: "Please fill in all the required fields", variant: "danger" }));
      return;
    }
  };

  return (
    <>
      <Modal
        className="editModal"
        show={props.show} //coming from filter.js
        fullscreen
      >
        <Container fluid className="editTransactionContainer">
          {/* Header */}
          <Modal.Header>
            <Modal.Title>Edit Transaction</Modal.Title>
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
                  label="Income"
                  onChange={handleChange("transactionType")} />
                <Form.Check
                  type="radio"
                  value="expense"
                  label="Expense"
                  onChange={handleChange("transactionType")} />
              </Form.Group>

              <Container fluid>
                <Form.Group className="transactionDate">
                  <Form.Label>Choose a Date *</Form.Label>
                  <DatePicker
                    required
                    selected={date}
                    value={transaction.date}
                    onChange={(date) => setDate(date)} />
                </Form.Group>

                <Form.Group className="transactionCategory">
                  <Form.Label>Select a Category *</Form.Label>
                  <Form.Select
                    required
                    defaultValue="Choose..."
                    value={transaction.categoryName}
                    onChange={handleChange("categoryName")}>
                    <option>Choose...</option>
                    <option>Food</option>
                    <option>House</option>
                    <option>Transportation</option>
                    <option>Other</option>
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
                  <Form.Label>Desctription</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter item description..."
                    value={transaction.description}
                    onChange={handleChange("description")} />
                </Form.Group>
              </Container>

              <Form.Group className="paymentMethod">
                <Form.Label>Payment Method *</Form.Label>
                <Form.Check
                  type="radio"
                  label="Debit Card"
                  value="Debit Card"
                  onChange={handleChange("paymentMethod")} />
                <Form.Check
                  type="radio"
                  label="Credit Card"
                  value="Credit Card"
                  onChange={handleChange("paymentMethod")} />
                <Form.Check
                  type="radio"
                  label="Cash"
                  value="Cash"
                  onChange={handleChange("paymentMethod")} />
              </Form.Group>

              <Container className="buttons">
                <Button className="saveBtn" type="submit">Save</Button>
                <Button className="deleteBtn">Delete</Button>
              </Container>

            </Form>
          </Modal.Body>
        </Container>
      </Modal>


    </>
  );
};

export default EditTransaction;
