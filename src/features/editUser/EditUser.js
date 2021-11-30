import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../userProfile/userSlice";
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
import { removeUser } from "../userProfile/userSlice";

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
  //log out
  const logOut = async () => {
    try {
      localStorage.removeItem("ET-token");
      const { data } = await axios.get("/auth/logout");
      dispatch(removeUser());
      dispatch(showAlert({
        message: "Account has successfully been deleted",
        variant: "info",
      }));
      navigate("/login");
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response.data.error
            ? error.response.data.error
            : "Sorry, there is an issues on the server.",
          variant: "danger",
        })
      );
      setTimeout(() => {
        dispatch(hideAlert());
      }, 5000);
    }
  };

  //onChange method
  const handleChange = (prop) => (e) => {
    setPassword({ ...password, [prop]: e.target.value });
  };

  const token = localStorage.getItem("ET-token");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  //Change password
  const changePassword = async (e) => {
    e.preventDefault();
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
      try {
        const response = await axios.post(`/users/edit`, password, config);
        if (response.statusText !== "OK") {
          throw response.statusText;
        } else {
          console.log("password edited", response.data);

          //close modal pop-up
          props.handleClose();
          //logout
          logOut();
        }
      } catch (error) {
        console.error(`${error}: Something wrong on the server side`);
        return error;
      }
    }
  };

  //Change avatar
  const changeProfilePic = async (e) => {
    e.preventDefault();
    if (profPic === "") {
      dispatch(showAlert({
        message: "Please select your profile picture",
        variant: "danger"
      }));
      return;
    } else {
      //send data to backend
      try {
        const response = await axios.post(`/users/edit`, profPic, config);
        if (response.statusText !== "OK") {
          throw response.statusText;
        } else {
          console.log("prof pic edited", response.data);
          //close modal pop-up
          props.handleClose();
          //logout
          logOut();
        }
      } catch (error) {
        console.error(`${error}: Something wrong on the server side`);
        return error;
      }
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
