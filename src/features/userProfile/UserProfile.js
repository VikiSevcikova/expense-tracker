import React, { useState } from 'react';
import "./UserProfile.scss";
import {
  Card,
  Button,
  Row,
  Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import EditUser from "../editUser/EditUser";
import DeleteConfirmation from '../deleteConfimation/DeleteConfirmation';
import { MdEdit } from 'react-icons/md';
import InputField from '../inputField/InputField';
import { BsCheckCircleFill } from 'react-icons/bs';
import * as Yup from "yup";
import { Formik } from 'formik';

const NameSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

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

  const [isEdit, setIsEdit] = useState(false);

  //method
  const changeUserAccount = (userInfo) => {
    setUserInfo(userInfo);
    setShow(true);
  };

  const changeIsEdit = () => {
    setIsEdit(!isEdit);
  }

  const handleSubmit = (values) => {
    console.log(values)
    if(values.name !== user.username) {
      console.log("changed")
    }
    changeIsEdit();
  }

  return (
    <>
      <Card fluid className="userProfileCard">

          <Card.Title className="d-flex justify-content-center mb-3">
        {!isEdit ? 
            
            <>
            {user.username} 
            <MdEdit className="ms-2" onClick={changeIsEdit}/> 
            </>
            :
            <Formik
            initialValues={{
              name: user.username,
            }}
            validationSchema={NameSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <>
            <Form className="d-flex justify-content-center align-items-center">
              <input id="name" type="text" className="input-name" value={values.name} onChange={handleChange} onBlur={handleBlur}/>
              <BsCheckCircleFill onClick={(e)=>{e.preventDefault(); handleSubmit()}} fontSize="30px" className="ms-2 position-relative"/>
            </Form>
            <Form.Control.Feedback type="invalid" className="mb-3 ms-2 position-absolute">
              {touched.name && errors.name}
            </Form.Control.Feedback>
            </>
          )}
          </Formik>
        }
         </Card.Title>

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
          // checkedItemId={operation.checkedItem[0]._id} //pass user id to del conf
          closeDelConf={closeDelConf} />}
    </>
  );
};

export default UserProfile;