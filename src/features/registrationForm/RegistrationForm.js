import React, { useState } from "react";
import { Image, Row, Col, Form } from "react-bootstrap";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (user) {
    localStorage.setItem("loggedInUser", values.email);
    navigate("/dashboard");
    // } else {
    // console.log("Invalid email or password")
    // }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col xs={3}>
          <Image src="/images/et-logo.png" alt="expense_tracker_logo" fluid />
        </Col>
        <Col xs={9} className="justify-content-start align-items-center">
          <h1 className="m-0 text-start">Create new account.</h1>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <InputField
          id="name"
          type="text"
          label="Name"
          value={values.name}
          handleChange={handleChange}
        />
        <InputField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          handleChange={handleChange}
        />
        <InputField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          handleChange={handleChange}
        />
        <InputField
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          value={values.confirmPassword}
          handleChange={handleChange}
        />
        <FormBtn type="submit" name="Sign up" />
      </Form>

      <p className="line-text m-0">
        <span> or </span>
      </p>

      <FormBtn
        name="Continue with Google"
        icon={<BsGoogle className="icon" />}
      />

      <p className="m-0 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default RegistrationForm;
