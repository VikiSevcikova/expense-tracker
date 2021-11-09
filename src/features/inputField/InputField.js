import { useEffect, useState } from "react";
import { Form, FloatingLabel, InputGroup } from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import "./InputField.scss";

const InputField = ({ id, type, label, value, handleChange }) => {
  const [error, setError] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const validateField = () => {
    setIsClicked(true);
    if (value === "") {
      setError(`${label} is required!`);
    } else if (id === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setError(`${label} is invalid!`);
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (isClicked) validateField();
  }, [value]);

  return (
    <Form.Group className="mb-4 position-relative" controlId={id}>
      <FloatingLabel controlId={id} label={label}>
        <Form.Control
          required
          className="dark"
          type={type}
          placeholder={label}
          value={value}
          onFocus={()=>setIsClicked(true)}
          onBlur={validateField}
          onChange={handleChange(id)}
          isInvalid={!!error}
        />
         <Form.Control.Feedback type="invalid" className="mb-3 position-absolute">
          {error}
        </Form.Control.Feedback>
      </FloatingLabel>
     
    </Form.Group>
  );
};

export default InputField;
