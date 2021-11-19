import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DeleteConfirmation.scss";
import { FaTimesCircle } from "react-icons/fa";
import {
  Container,
  Button,
  Modal,
} from 'react-bootstrap';

const DeleteConfirmation = (props) => {

  console.log("I am in delconf.js", props);

  //router
  const navigate = useNavigate();

  //method
  const handleDelete = async (id) => {
    console.log(id);
    const config = {
      headers: {
        "Content-type": "application/json"
      },
    };

    //send data to backend - delete single tran
    try {
      const response = await axios.delete(`http://localhost:5000/alltransaction/delete/${id}`, config);
      console.log(response);
      if (response.statusText !== "OK") {
        throw response.statusText;
      } else {
        //close modal pop-up
        props.closeDelConf();
        //go back to alltransaction page
        navigate("/alltransaction", {
          state: response.data
        });
      }
    } catch (error) {
      console.error(`${error}: Something wrong on the server side`);
      return error;
    }
  };

  return (
    <>
      <Modal
        className="delConfModal"
        show={props.show} //coming from filter.js
        centered
        onHide={props.closeDelConf}
      >
        <Container className="delConfContainer">
          <Modal.Header>
            <FaTimesCircle
              className="modalClsBtn"
              onClick={props.closeDelConf} />
          </Modal.Header>
          <Modal.Body>
            <p> Are you sure you want to delete the transaction?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="cancelBtn"
              onClick={props.closeDelConf}>Cancel</Button>
            <Button
              className="deleteBtn"
              onClick={() => handleDelete(props.checkedItem[0]._id)}>Delete</Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
