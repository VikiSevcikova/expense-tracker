import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  const [profPic, setProfPic] = useState("");

  //redux
  const dispatch = useDispatch();

  //router
  const navigate = useNavigate();

  //method
  const handleChange = (prop) => (e) => {
    setPassword({ ...password, [prop]: e.target.value });
  };

  const config = {
    headers: {
      "Content-type": "application/json"
    },
  };

  const changePassword = async (e) => {

    e.preventDefault();

    console.log("Changing password now, state is", password);
    //validation check 1 - required field
    if (password.newPassword === "" || password.confirmPassword === "") {
      dispatch(showAlert({
        message: "Please fill in all the required fields",
        variant: "danger"
      }));
      return;
    } else if (password.newPassword !== password.confirmPassword) {
      //validation check 2 - password match
      dispatch(showAlert({
        message: "Both password must be the same",
        variant: "danger"
      }));
      return;
    } else {
      //send data to backend
      const response = await axios.post("/users/edit", password, config);
      if (response.statusText !== "OK") {
        throw response.statusText;
      } else {
        //close modal pop-up
        props.handleClose();
      }
      //go back to alltransaction page
      navigate("/alltransaction", {
        state: response.data
      });

    }
  };

  const changeProfilePic = (e) => {
    e.preventDefault();
    if (profPic === "") {
      dispatch(showAlert({
        message: "Please select your profile picture",
        variant: "danger"
      }));
      return;
    } else {
      console.log("update backend!!");
      //connect to backend
      //Continue from here
      //
      //
      //
    }
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
              onSubmit={props.userInfo === "profilePic" ?
                changeProfilePic : changePassword}
            >
              {props.userInfo === "profilePic" ?
                <>
                  <Form.Group className="photoInput">
                    <Form.Label>Select Profile Picture *</Form.Label>
                    <Form.Control
                      type="file"
                      value={profPic}
                      onChange={e => setProfPic(e.target.value)}
                    />
                  </Form.Group>
                </> :
                <>
                  <Form.Group className="passwordInput" >
                    <Form.Label>Enter New Password *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter new password..."
                      value={password.newPassword}
                      onFocus={() => setPassword({ ...password, ["newPassword"]: "" })}
                      onChange={handleChange("newPassword")}
                    />
                  </Form.Group>
                  <Form.Group className="passwordInputConfirm" >
                    <Form.Label>Confirm New Password *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Confirm new password..."
                      value={password.confirmPassword}
                      onFocus={() => setPassword({ ...password, ["confirmPassword"]: "" })}
                      onChange={handleChange("confirmPassword")}
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
