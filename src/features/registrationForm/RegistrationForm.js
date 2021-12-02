import axios from "axios";
import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";
import { showAlert } from "../alertMessage/alertMessageSlice";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getUser } from "../../utils/utils";
import { setUser } from "../userProfile/userSlice";
import GoogleLoginBtn from "../googleLogin/GoogleLoginBtn";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
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
    try {
      const formData = {
        username: values.name,
        email: values.email,
        password: values.password,
      };
      const { data } = await axios.post("/auth/register", formData);

      localStorage.setItem("ET-token", data.token);

      const { user } = await getUser(data.token);
      dispatch(setUser(user));
      navigate("/");
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
          <Image src="/images/et-logo.png" alt="expense_tracker_logo" fluid />
        </Col>
        <Col xs={9} className="justify-content-start align-items-center">
          <h1 className="m-0 text-start">
            Create new account<span className="accent-color">.</span>
          </h1>
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

      <GoogleLoginBtn />

      <p className="m-0 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default RegistrationForm;
