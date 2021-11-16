import React, { useState } from "react";
import { Image, Row, Col } from "react-bootstrap";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
});

const ForgotPasswordForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values) => {
    setSubmitted(true);
    console.log(values);
  };

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col xs={3}>
          <Image src="/images/et-logo.png" alt="expense_tracker_logo" fluid />
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
          Please check your email and reset your password via link.
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
        </>
      )}
    </>
  );
};

export default ForgotPasswordForm;
