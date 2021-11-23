import React, { useEffect, useState } from 'react';
import "./EditUser.scss";
import {
  Container,
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import { FaTimesCircle } from "react-icons/fa";
import {
  showAlert,
  hideAlert
} from '../alertMessage/alertMessageSlice';

const EditUser = (props) => {

  console.log("I am in Edit user", props);

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
            <Modal.Title>Edit User Account</Modal.Title>
            {/* {props.operationType === "add" ?
              <Modal.Title>Add New Transaction</Modal.Title> :
              <Modal.Title>Edit Transaction</Modal.Title>}*/}
            <FaTimesCircle
              className="modalClsBtn"
              onClick={props.handleClose}
            />
          </Modal.Header>

          {/* Body */}
          <Modal.Body>
            <Form
              className="editForm"
            >

              <Form.Group className="transactionAmount" >
                <Form.Label>Enter New Password</Form.Label>
                <Form.Control
                  required type="text"
                  placeholder="Enter new password..."
                // value={transaction.amount}
                // onFocus={() => setTransaction({ ...transaction, ["amount"]: "" })}
                // onChange={handleChange("amount")} 
                />
              </Form.Group>


              <Container className="buttons">
                <Button className="saveBtn" type="submit">Save</Button>
                {/* Delete button only visible when editing the transaction */}
                {/* {props.operationType === "edit" &&
                  <Button
                    className="deleteBtn"
                    onClick={showDelConf}>Delete</Button>}
                {delConf &&
                  <DeleteConfirmation
                    show={delConf}
                    closeDelConf={closeDelConf}
                    checkedItemId={transaction.id}
                    handleClose={props.handleClose}  />} */}
              </Container>

            </Form>
          </Modal.Body>
        </Container>
      </Modal>

    </>
  );
};

export default EditUser;
