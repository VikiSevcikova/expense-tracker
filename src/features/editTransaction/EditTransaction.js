import React, { useState } from 'react';
import "./EditTransaction.scss";
import useMedia from "use-media";
import {
  Container,
  Form,
  Button,
  Modal,
  Dropdown,
  DropdownButton
} from 'react-bootstrap';
import { FaTimesCircle } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditTransaction = (props) => {

  console.log(props);//coming from filter.js

  //Calendar filter
  const [date, setDate] = useState(new Date());

  //checkbox choices
  const [trxType, setTrxType] = useState({})

  //private state
  const [transaction, setTransaction] = useState({
    expense: true,
    categoryName: "",
    date: date,
    amount: 0,
    description: "",
    paymentMethod: ""
  });

  //method
  const handleChange = (prop) => (e) => {
    console.log(prop);
    console.log(e);
    setTransaction({ ...transaction, [prop]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transaction);

    //validation check
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
              <Form.Group
                className="transactionType"
              >
                <Form.Check
                  type="radio"
                  value="income"
                  label="Income"
                  name="income"
                  onChange={handleChange("expense")} />
                <Form.Check
                  type="radio"
                  value="expense"
                  label="Expense"
                  name="expense"
                  onChange={handleChange("expense")} />
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

              <Form.Group
                className="paymentMethod"
                value={transaction.paymentMethod}
                onChange={handleChange("paymentMethod")}>
                <Form.Label>Payment Method *</Form.Label>
                <Form.Check type="radio" label="Debit Card" />
                <Form.Check type="radio" label="Credit Card" />
                <Form.Check type="radio" label="Cash" />
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
