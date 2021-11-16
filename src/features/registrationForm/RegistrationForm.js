import axios from "axios";
import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import { BsGoogle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";
import { showAlert, hideAlert } from "../alertMessage/alertMessageSlice";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const user = {
        username: values.name,
        email: values.email,
        password: values.password,
      };
      const { data } = await axios.post("/auth/register", user, config);

      localStorage.setItem("authToken", data.token);

      navigate("/dashboard");
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response.data.error
            ? error.response.data.error
            : "Sorry, there is an issues on the server.",
          variant: "danger",
        })
      );
      setTimeout(() => {
        dispatch(hideAlert());
      }, 5000);
    }
  };

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col xs={3}>
          <Image src="/images/et-logo.png" alt="expense_tracker_logo" fluid />
        </Col>
        <Col xs={9} className="justify-content-start align-items-center">
          <h1 className="m-0 text-start">Create new account<span className="accent-color">.</span></h1>
        </Col>
      </Row>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegistrationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <InputField
              id="name"
              type="text"
              label="Name"
              value={values.name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.name && errors.name}
            />
            <InputField
              id="email"
              type="email"
              label="Email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.email && errors.email}
            />
            <InputField
              id="password"
              type="password"
              label="Password"
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.password && errors.password}
            />
            <InputField
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              value={values.confirmPassword}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.confirmPassword && errors.confirmPassword}
            />
            <FormBtn type="submit" name="Sign up" />
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
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default RegistrationForm;
