import {
    Button,
  } from "react-bootstrap";
import "./FormBtn.scss";

const FormBtn = ({name, type, icon, className, onClick}) => {

    return(
        <Button onClick={onClick} variant="green" type={type} className={`w-100 ${className ? className : ""}`}>
            {icon} {name}
        </Button>
    );
}

export default FormBtn;