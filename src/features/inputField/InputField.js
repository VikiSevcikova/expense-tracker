import {
    Form,
    FloatingLabel,
  } from "react-bootstrap";
import "./InputField.scss";

const InputField = ({id, type, label}) => {

    return(
        <Form.Group className="mb-3" controlId={`formBasic${id}`}>
        <FloatingLabel controlId={id} label={label}>
          <Form.Control className="dark" id={id} type={type} placeholder={label}/>
        </FloatingLabel>
        {/* <Form.Text className="text-invalid">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>
    );
}

export default InputField;