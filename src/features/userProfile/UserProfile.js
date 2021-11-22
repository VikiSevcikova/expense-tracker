import React from 'react';
import "./UserProfile.scss";
import {
  Container,
  Card,
  Button,
  Modal,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';

const UserProfile = () => {
  const { user } = useSelector(selectUser);
  const avatar = user && user.avatar ? user.avatar : "./avatar.jpg";

  return (
    <>
      <Card fluid className="userProfileCard">
        <Card.Title>User Name</Card.Title>
        <Card.Img className="avatar" src={avatar} />
        <Card.Body>
          <Button>Change Profile Picture</Button>
          <Button>Change User Name</Button>
          <Button>Change Password</Button>
          <Button className="delBtn">Delete Account</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserProfile;
