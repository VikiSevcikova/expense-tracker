import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log(values)
    // if (user) {
    localStorage.setItem("loggedInUser", values.email);
    navigate("/dashboard");
    // } else {
    // console.log("Invalid email or password")
    // }
  };


  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col xs={3}>
          <Image src="/images/et-logo.png" alt="expense_tracker_logo" fluid />
        </Col>
        <Col xs={9} className="justify-content-start align-items-center">
          <h1 className="m-0 text-start">Login to the app<span className="accent-color">.</span></h1>
        </Col>
      </Row>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={LoginSchema}
        onSubmit={values => {
          handleSubmit(values)
        }}
        >
        {( {values,
          errors,
          touched,
          handleChange,
          handleBlur
        }) => (
          <Form>
            <InputField
              id="email"
              type="email"
              label="Email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.email && errors.email}
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
              handleBlur={handleBlur}
              error={touched.password && errors.password}
            />
            <FormBtn type="submit" name="Login" />
          </Form>
        )}
      </Formik>

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
