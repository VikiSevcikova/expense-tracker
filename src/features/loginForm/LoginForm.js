import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../userProfile/userSlice";
import { getUser } from "../../utils/utils";
import { showAlert } from "../alertMessage/alertMessageSlice";
import GoogleLoginBtn from "../googleLogin/GoogleLoginBtn";
import { selectTheme } from "../themeChanger/themeChangerSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  //router
  const navigate = useNavigate();
  //redux
  const dispatch = useDispatch();
  const { mode } = useSelector(selectTheme);
  const logo = mode === 'dark' ? "/images/et-logo.png" : "/images/et-logo-g.png";

  const handleSubmit = async (values) => {
    try{
      const formData = {
        email: values.email,
        password: values.password,
      };
      const { data } = await axios.post("/auth/login", formData);
      dispatch(setToken(data.token));
  
      const { user } = await getUser(data.token);
      dispatch(setUser(user));
  
      navigate("/");
    }catch(error){
      dispatch(
        showAlert({
          message: error && error.response && error.response.data
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

      <GoogleLoginBtn />

      <p className="m-0 text-center">
        Don't have account? <Link to="/registration">Sign up</Link>
      </p>
    </>
  );
};

export default LoginForm;
