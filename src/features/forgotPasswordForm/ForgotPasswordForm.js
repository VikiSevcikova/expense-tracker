import React, { useState } from "react";
import { Image, Row, Col } from "react-bootstrap";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../alertMessage/alertMessageSlice";
import { selectTheme } from "../themeChanger/themeChangerSlice";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
});

const ForgotPasswordForm = () => {
  //redux
  const dispatch = useDispatch();
  const { mode } = useSelector(selectTheme);
  const logo = mode === 'dark' ? "/images/et-logo.png" : "/images/et-logo-g.png";

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/reset-password`, values);
      setSubmitted(true);
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response.data.error
            ? error.response.data.error
            : "Sorry, something went wrong on the server side",
          variant: "danger",
        })
      );
    }
  };

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col xs={3}>
          <Image src={logo} alt="expense_tracker_logo" fluid />
        </Col>
        <Col xs={9} className="justify-content-start align-items-center">
          <h1 className="m-0 text-start">
            {submitted ? "Email has been sent" : "Confirm your email"}
            <span className="accent-color">.</span>
          </h1>
        </Col>
      </Row>
      {submitted ? (
        <h5 className="mb-4 text-start">
          Please check your email and reset your password via link and{" "}
          <Link to="/login">login.</Link>
        </h5>
      ) : (
        <>
          <h5 className="mb-4 text-start">
            Enter the email address associated to you account and we’ll send you
            a link to reset your password.
          </h5>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
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
                <FormBtn type="submit" name="Submit" />
              </Form>
            )}
          </Formik>
          <p className="m-0 text-center">
            Did you just remember? <Link to="/login">Login</Link>
          </p>
        </>
      )}
    </>
  );
};

export default ForgotPasswordForm;
