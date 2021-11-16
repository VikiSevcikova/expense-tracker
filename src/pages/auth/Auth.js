import React, { useEffect, useState } from "react";
import LoginForm from "../../features/loginForm/LoginForm";
import "./Auth.scss";
import { Container, Col, Row } from "react-bootstrap";
import RegistrationForm from "../../features/registrationForm/RegistrationForm";
import { useLocation } from "react-router";
import ForgotPasswordForm from "../../features/forgotPasswordForm/ForgotPasswordForm";

const Auth = () => {
  const { pathname } = useLocation();
  const [content, setContent] = useState(null);

  useEffect(() => {
    switch (pathname) {
      case "/login":
        setContent(<LoginForm />);
        break;
      case "/registration":
        setContent(<RegistrationForm />);
        break;
      case "/forgot-password":
        setContent(<ForgotPasswordForm />);
        break;
      case "/reset-password":
        setContent(<RegistrationForm />);
        break;
      default:
        setContent("Not Found");
    }
  }, [pathname]);

  return (
    <>
      <Container fluid className="auth-container d-flex align-items-center">
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
