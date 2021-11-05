import React from 'react';
import {
  Form,
  FormControl,
  Button,
  FloatingLabel
} from 'react-bootstrap';

const LoginForm = () => {
  return (
    <>
    <h2>Create new account</h2>
    <Form.Floating >
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel controlId="email" label="Email">
                <Form.Control id="email" type="email" placeholder="Enter email" />
            </FloatingLabel>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="password" label="Password">
                <Form.Control id="password" type="password" placeholder="Password" />
            </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form.Floating>
    </>
  );
};

export default LoginForm;
