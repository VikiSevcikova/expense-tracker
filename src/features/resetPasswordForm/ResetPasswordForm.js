import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import FormBtn from "../formButton/FormBtn";
import InputField from "../inputField/InputField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../alertMessage/alertMessageSlice";
import { Link } from "react-router-dom";
import { selectTheme } from "../themeChanger/themeChangerSlice";

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

const ResetPasswordForm = () => {
  //router
  const navigate = useNavigate();
  const {userId, token} = useParams();

  //redux
  const dispatch = useDispatch();
  const { mode } = useSelector(selectTheme);
  const logo = mode === 'dark' ? "/images/et-logo.png" : "/images/et-logo-g.png";
  
  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(`/auth/reset-password/${userId}/${token}`, {password: values.password});
      dispatch(
        showAlert({
          message: data.message,
          variant: "info",
        })
      );
      navigate("/login");
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
      <p className="m-0 text-center">
        Did you just remember? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default ResetPasswordForm;
