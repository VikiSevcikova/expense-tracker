import React, { useState } from 'react';
import "./UserProfile.scss";
import {
  Container,
  Card,
  Button,
  Modal,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import EditUser from "../editUser/EditUser";
import DeleteConfirmation from '../deleteConfimation/DeleteConfirmation';

const UserProfile = () => {

  const { user } = useSelector(selectUser);
  const avatar = user && user.avatar ? user.avatar : "./avatar.jpg";

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
    console.log("change user", userInfo);
    setUserInfo(userInfo);
    setShow(true); 
  };

  return (
    <>
      <Card fluid className="userProfileCard">
        <Card.Title>User Name</Card.Title>
        <Card.Img className="avatar" src={avatar} />
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
         // checkedItemId={operation.checkedItem[0]._id} //pass user id
          closeDelConf={closeDelConf}
          handleClose={handleClose} />}
    </>
  );
};

export default UserProfile;
