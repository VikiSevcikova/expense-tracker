import {
    Button,
  } from "react-bootstrap";
import "./FormBtn.scss";
import {BsGoogle} from "react-icons/bs";

const FormBtn = ({name, type, icon}) => {

    return(
        <Button variant="green" type={type} className="w-100">
            {icon} {name}
        </Button>
    );
}

export default FormBtn;