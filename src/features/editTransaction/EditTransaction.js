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
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Modal
        className="editModal"
        show={props.show}
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
            <Form className="editForm">
              <Form.Group className="transactionType">
                <Form.Check type="radio" label="Income" />
                <Form.Check type="radio" label="Expense" />
              </Form.Group>

              <Form.Group className="transactionDate">
                <Form.Label>Choose a Date *</Form.Label>
                <DatePicker
                  required
                  selected={startDate}
                  onChange={(date) => setStartDate(date)} />
              </Form.Group>

              <Form.Group className="transactionCategory">
                <Form.Label>Select a Category *</Form.Label>
                <Form.Select required defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>Food</option>
                  <option>Food</option>
                  <option>Food</option>
                  <option>Food</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="transactionAmount" >
                <Form.Label>Enter an Amount *</Form.Label>
                <Form.Control required type="text" placeholder="$" />
              </Form.Group>

              <Form.Group className="transactionDescription" >
                <Form.Label>Desctription</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter item description..." />
              </Form.Group>

              <Form.Group className="paymentMethod">
                <Form.Label>Payment Method *</Form.Label>
                <Form.Check type="radio" label="Debit Card" />
                <Form.Check type="radio" label="Credit Card" />
                <Form.Check type="radio" label="Cash" />
              </Form.Group>

            </Form>
          </Modal.Body>

          {/* Footer */}
          <Modal.Footer>
            <Button className="saveBtn" type="submit">Save</Button>
            <Button className="deleteBtn">Delete</Button>
          </Modal.Footer>
        </Container>
      </Modal>


    </>
  );
};

export default EditTransaction;
