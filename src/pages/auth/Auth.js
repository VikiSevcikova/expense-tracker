import React from 'react';
import LoginForm from '../../features/loginForm/LoginForm';
import './Auth.scss';
import {
 Container, Row, Col
} from 'react-bootstrap';
const Auth = () => {

  return (
    <>
      <Container fluid className="auth-container d-flex align-items-center">
          <Col md={5} className="m-5"> 
            <LoginForm/>
          </Col>
      </Container>
    </>
  );
}

export default Auth;
