import React from "react";
import {
  Image,
  Row,
  Col,
  Form
} from "react-bootstrap";
import { BsGoogle } from "react-icons/bs";
import { Link } from "react-router-dom";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";

const RegistrationForm = () => {
  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col xs={3} >
          <Image src="/images/et-logo.png" alt="expense_tracker_logo" fluid />
        </Col>
        <Col xs={9} className="justify-content-start align-items-center">
          <h1 className="m-0 text-start">Create new account.</h1>
        </Col>
      </Row>

      <Form>
        <InputField id="name" type="text" label="Name" />
        <InputField id="email" type="email" label="Email" />
        <InputField id="password" type="password" label="Password" />
        <InputField id="confirmPassword" type="password" label="Confirm Password" />
        <FormBtn type="submit" name="Sign up"/>
      </Form>

      <p className="line-text m-0"><span> or </span></p>

      <FormBtn name="Continue with Google" icon={<BsGoogle className="icon"/>}/>
      
      <p className="m-0">Already have an account? <Link to="/login">Login</Link></p>
    </>
  );
};

export default RegistrationForm;
