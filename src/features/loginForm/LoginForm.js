import React, { useState } from "react";
import { Image, Row, Col, Form } from "react-bootstrap";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";

const LoginForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
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
          <h1 className="m-0 text-start">Login to the app.</h1>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <InputField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          handleChange={handleChange}
        />
        <Link to="/forgot-password">
          <p className="text-end m-0"> Forgot password? </p>
        </Link>
        <InputField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          handleChange={handleChange}
        />
        <FormBtn type="submit" name="Login" />
      </Form>

      <p className="line-text m-0">
        <span> or </span>
      </p>

      <FormBtn
        name="Continue with Google"
        icon={<BsGoogle className="icon" />}
      />

      <p className="m-0 text-center">
        Don't have account? <Link to="/registration">Sign up</Link>
      </p>
    </>
  );
};

export default LoginForm;
