import React, { useState } from "react";
import {
  Image,
  Row,
  Col,
  Form
} from "react-bootstrap";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";

const ForgotPasswordForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col xs={3} >
          <Image src="/images/et-logo.png" alt="expense_tracker_logo" fluid />
        </Col>
        <Col xs={9} className="justify-content-start align-items-center">
          <h1 className="m-0 text-start">{submitted ? "Email has been sent." : "Confirm your email."}</h1>
        </Col>
      </Row>
      {submitted ? 
        <Row className="mb-4 text-start">
          <h5>Please check your email and reset your password via link.</h5>
        </Row>
        :
        <>
          <Row className="mb-4 text-start">
            <h5>Enter the email address associated to you account and we’ll send you a link to reset your password.</h5>
          </Row>
          <Form onSubmit={handleSubmit}>
            <InputField id="email" type="email" label="Email" value={values.email} handleChange={handleChange}/>
            <FormBtn type="submit" name="Submit"/>
          </Form>
        </>
      }

    
    </>
  );
};

export default ForgotPasswordForm;
