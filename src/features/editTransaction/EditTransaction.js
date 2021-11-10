import React, { useState } from 'react';
import "./EditTransaction.scss";
import useMedia from "use-media";
import {
  Container,
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import { FaTimesCircle } from "react-icons/fa";

const EditTransaction = (props) => {

  console.log(props);//coming from filter.js

  return (
    <>
      <Modal
        className="editModal"
        show={props.show}
        fullscreen
      >
        <Container fluid className="editTransactionContainer">
          <Modal.Header>
            <Modal.Title>Edit Transaction</Modal.Title>
            <FaTimesCircle
              className="modalClsBtn"
              onClick={props.handleClose} />
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="transactionType">
                <Form.Check type="checkbox" label="Income" />
                <Form.Check type="checkbox" label="Expense" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button className="saveBtn">Save</Button>
            <Button className="deleteBtn">Delete</Button>
          </Modal.Footer>
        </Container>
      </Modal>


    </>
  );
};

export default EditTransaction;
