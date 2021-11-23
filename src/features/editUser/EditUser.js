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

  //private state
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  //method
  const handleChange = () => {

  };

  const changePassword = () => {

  };

  return (
    <>
      <Modal
        className="editUserAccountModal"
        show={props.show}
        fullscreen
      >
        <Container fluid className="editUserAccountContainer">
          {/* Header */}
          <Modal.Header>
            {props.userInfo === "profilePic" ?
              <Modal.Title>Change Profile Picture</Modal.Title> :
              <Modal.Title>Change Password</Modal.Title>}
            <FaTimesCircle
              className="modalClsBtn"
              onClick={props.handleClose}
            />
          </Modal.Header>

          {/* Body */}
          <Modal.Body>
            <Form
              className="editUserForm"
              onSubmit={changePassword}
            >
              {props.userInfo === "profilePic" ?
                <>
                  <Form.Group className="photoInput" >
                    <Form.Label>Select Profile Picture</Form.Label>
                    <Form.Control
                      required type="text"
                      placeholder="Select profile picture..."
                    // value={transaction.amount}
                    // onFocus={() => setTransaction({ ...transaction, ["amount"]: "" })}
                    // onChange={handleChange("amount")} 
                    />
                  </Form.Group>
                </> :
                <>
                  <Form.Group className="passwordInput" >
                    <Form.Label>Enter New Password</Form.Label>
                    <Form.Control
                      required type="text"
                      placeholder="Enter new password..."
                      value={password.newPassword}
                      onFocus={() => setPassword({ ...password, ["newPassword"]: "" })}
                      onChange={handleChange()}
                    />
                  </Form.Group>
                  <Form.Group className="passwordInputConfirm" >
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      required type="text"
                      placeholder="Confirm new password..."
                      value={password.confirmPassword}
                      onFocus={() => setPassword({ ...password, ["confirmPassword"]: "" })}
                      onChange={handleChange()}
                    />
                  </Form.Group>
                </>}

              <Container className="buttons">
                <Button
                  className="cancelBtn"
                  onClick={props.handleClose}>Cancel</Button>
                <Button
                  className="saveBtn"
                  type="submit">Save</Button>
              </Container>
            </Form>
          </Modal.Body>
        </Container>
      </Modal>

    </>
  );
};

export default EditUser;
