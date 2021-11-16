import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});


const handleSubmit = (values) => {
  console.log(values);
};

const ResetPasswordForm = () => {
  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col xs={3}>
          <Image src="/images/et-logo.png" alt="expense_tracker_logo" fluid />
        </Col>
        <Col xs={9} className="justify-content-start align-items-center">
          <h1 className="m-0 text-start">
            Reset your password<span className="accent-color">.</span>
          </h1>
        </Col>
      </Row>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
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
            <FormBtn type="submit" name="Submit" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
