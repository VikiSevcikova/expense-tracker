import React from 'react';
import "./UserProfile.scss";
import {
  Container,
  Card,
  Button,
  Modal,
} from 'react-bootstrap';

const UserProfile = () => {
  return (
    <>
      <Card fluid className="userProfileCard">
        <Card.Title>User Name</Card.Title>
        <Card.Img className="avatar" src="./avatar.jpg" />
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
