import React, { useState } from "react";
import {
  Image,
  Row,
  Col,
  Form
} from "react-bootstrap";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";

const ResetPasswordForm = () => {

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col xs={3} >
          <Image src="/images/et-logo.png" alt="expense_tracker_logo" fluid />
        </Col>
        <Col xs={9} className="justify-content-start align-items-center">
          <h1 className="m-0 text-start">Reset your password</h1>
        </Col>
      </Row>
      <Form>
        <InputField id="password" type="password" label="Password" />
        <InputField id="confirmPassword" type="password" label="Confirm Password" />
        <FormBtn type="submit" name="Submit"/>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
