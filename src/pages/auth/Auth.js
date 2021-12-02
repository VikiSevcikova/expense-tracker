import React, { useEffect, useState } from "react";
import LoginForm from "../../features/loginForm/LoginForm";
import "./Auth.scss";
import { Container, Col, Row } from "react-bootstrap";
import RegistrationForm from "../../features/registrationForm/RegistrationForm";
import { useLocation } from "react-router";
import ForgotPasswordForm from "../../features/forgotPasswordForm/ForgotPasswordForm";
import ResetPasswordForm from "../../features/resetPasswordForm/ResetPasswordForm";

const Auth = () => {
  const { pathname } = useLocation();
  const [content, setContent] = useState(null);

  useEffect(() => {
    switch (pathname.split("/")[1]) {
      case "login":
        setContent(<LoginForm />);
        break;
      case "registration":
        setContent(<RegistrationForm />);
        break;
      case "forgot-password":
        setContent(<ForgotPasswordForm />);
        break;
      case "reset-password":
        setContent(<ResetPasswordForm />);
        break;
      default:
        setContent("Not Found");
    }
  }, [pathname]);

  return (
    <>
      <Container fluid className="auth-container d-flex align-items-center" style={{padding:"20px"}}>
        <Col md={6} className="m-3">
        <Row>
          <Col md={6} className="m-auto">
              {content}
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default Auth;
