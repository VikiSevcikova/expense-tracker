import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
} from '../alertMessage/alertMessageSlice';
import { removeUser, updateUser, selectUser } from "../userProfile/userSlice";
import { getHeaderConfig } from '../../utils/utils';
import { selectTheme } from "../themeChanger/themeChangerSlice";

const EditUser = (props) => {

  //private state
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [profPic, setProfPic] = useState("");

  //redux
  const dispatch = useDispatch();
  const { token } = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  //router
  const navigate = useNavigate();

  //method
  //log out
  const logOut = () => {
    dispatch(removeUser());
    dispatch(showAlert({
      message: "Account has successfully been updated",
      variant: "info",
    }));
    navigate("/login");
  };

  //onChange method
  const handleChange = (prop) => (e) => {
    setPassword({ ...password, [prop]: e.target.value });
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
        const response = await axios.post(
          `/users/edit`,
          {
            password: password.newPassword
          },
          getHeaderConfig(token));
        if (response.statusText !== "OK") {
          throw response.statusText;
        } else {
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

  //Upload image to Cloudinary
  const uploadImage = async () => {
    //upload image to cloudinary
    const formData = new FormData();
    formData.append("file", profPic);
    formData.append("upload_preset", "su4ijezp");
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/yukim/image/upload", formData);
      if (res.statusText !== "OK") {
        throw res.statusText;
      } else {
        return res.data;
      }
    } catch (error) {
      console.error(`${error}: Something wrong on the server side`);
      return error;
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
      //upload image to cloudinary
      const imageData = await uploadImage();

      //send data to backend
      try {
        const response = await axios.post(
          `/users/edit`,
          {
            avatar: imageData.secure_url
          },
          getHeaderConfig(token));
        if (response.statusText !== "OK") {
          throw response.statusText;
        } else {
          //update state
          dispatch(updateUser({
            avatar: response.data.updatedUser.avatar
          }));

          //close modal pop-up
          props.handleClose();

          //show message
          dispatch(showAlert({
            message: "Profile Picture has successfully been updated",
            variant: "info",
          }));
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
        className={theme.mode === "dark" ? "editUserAccountModal" : "editUserAccountModal light"}
        show={props.show}
        centered
        onHide={props.handleClose}
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
                      //value={profPic}
                      onChange={e => setProfPic(e.target.files[0])}
                    />
                  </Form.Group>
                </> :
                <>
                  <Form.Group className="passwordInput" >
                    <Form.Label>Enter New Password *</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password..."
                      value={password.newPassword}
                      onFocus={() => setPassword({ ...password, newPassword: "" })}
                      onChange={handleChange("newPassword")}
                    />
                  </Form.Group>
                  <Form.Group className="passwordInputConfirm" >
                    <Form.Label>Confirm New Password *</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password..."
                      value={password.confirmPassword}
                      onFocus={() => setPassword({ ...password, confirmPassword: "" })}
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
