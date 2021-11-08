import {
    Button,
  } from "react-bootstrap";
import "./FormBtn.scss";

const FormBtn = ({name, type}) => {

    return(
        <Button variant="green" type={type} className="w-100">
            {name}
        </Button>
    );
}

export default FormBtn;