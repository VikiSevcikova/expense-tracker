import React, { useState, useEffect } from 'react';
import "./UserProfile.scss";
import {
  Card,
  Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectUser, setUser } from './userSlice';
import { getUser } from "../../utils/utils";
import EditUser from "../editUser/EditUser";
import DeleteConfirmation from '../deleteConfimation/DeleteConfirmation';
import { Image } from "cloudinary-react";

const UserProfile = () => {

  //redux
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  //router-dom
  const location = useLocation();

  //private state
  const setState = () => {
    if (user && user.avatar) {
      return user.avatar;
    } else {
      return "http://res.cloudinary.com/yukim/image/upload/v1638336063/cgqrfyythk5eqrpoiakw.jpg";
    }
  };
  const [avatar, setAvatar] = useState(setState());

  //when the user profile is changed, re-mount the componant to display the new pic
  useEffect(async () => {
    if (location.state !== null) {
      setAvatar(location.state);
      //update reducer (selector)
      const token = localStorage.getItem("ET-token");
      const { user } = await getUser(token);
      dispatch(setUser(user));
    }
  }, [location.state]);

  //Modal pop up (enter transaction)
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const handleClose = () => setShow(false);

  //Modal pop up (delete conf)
  const [delConf, setShowDelConf] = useState(false);
  const closeDelConf = () => setShowDelConf(false);
  const showDelConf = () => setShowDelConf(true);

  //method
  const changeUserAccount = (userInfo) => {
    setUserInfo(userInfo);
    setShow(true);
  };

  return (
    <>
      <Card fluid className="userProfileCard">
        <Card.Title>{user.username}</Card.Title>
        {/* <Card.Img className="avatar" src={avatar} /> */}
        <Image
          className="avatar"
          cloudName="yukim"
          publicId={avatar} />
        <Card.Body>
          <Button
            onClick={() => changeUserAccount("profilePic")}
          >
            Change Profile Picture</Button>
          <Button
            onClick={() => changeUserAccount("password")}>
            Change Password</Button>
          <Button
            className="delBtn"
            onClick={showDelConf}>
            Delete Account</Button>
        </Card.Body>
      </Card>
      {/* Modal */}
      {show &&
        <EditUser
          show={show}
          userInfo={userInfo}
          handleClose={handleClose} />}
      {delConf &&
        <DeleteConfirmation
          show={delConf}
          delete={"userAccount"}
          closeDelConf={closeDelConf} />}
    </>
  );
};

export default UserProfile;