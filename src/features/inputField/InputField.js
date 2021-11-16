import { useEffect, useState } from "react";
import { Form, FloatingLabel, InputGroup } from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import "./InputField.scss";

const InputField = ({ id, type, label, value, handleChange, handleBlur, error}) => {
 
  return (
    <Form.Group className="mb-4 position-relative" controlId={id}>
      <FloatingLabel controlId={id} label={label}>
        <Form.Control
          required
          className="dark"
          type={type}
          placeholder={label}
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          isInvalid={!!error}
        />
         <Form.Control.Feedback type="invalid" className="mb-3 ms-2 position-absolute">
          {error}
        </Form.Control.Feedback>
      </FloatingLabel>
     
    </Form.Group>
  );
};

export default InputField;
