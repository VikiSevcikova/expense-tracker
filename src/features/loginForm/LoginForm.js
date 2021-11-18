import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../userProfile/userSlice";
import { getUser } from "../../utils/utils";
import { hideAlert, showAlert } from "../alertMessage/alertMessageSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try{
      const formData = {
        email: values.email,
        password: values.password,
      };
      const { data } = await axios.post("/auth/login", formData);
      localStorage.setItem("ET-token", data.token)
  
      const { user } = await getUser(data.token);
      dispatch(setUser(user));
  
      navigate("/");
    }catch(error){
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
