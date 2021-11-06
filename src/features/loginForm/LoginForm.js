import React from "react";
import {
  Image,
  Row,
  Col,
  Form
} from "react-bootstrap";
import { Link } from "react-router-dom";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";

const LoginForm = () => {
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
        <InputField id="email" type="email" label="Email" />
        <Link to="/forgot-password"><p className="text-end m-0">  Forgot password? </p></Link> 
        <InputField id="password" type="password" label="Password" />
        <FormBtn type="submit" name="Login"/>
      </Form>

      <p className="line-text m-0"><span> or </span></p>

      <FormBtn name="Login with Google"/>
      
      <p className="m-0">Don't have account? <Link to="/registration">Sign up</Link></p>
    </>
  );
};

export default LoginForm;
