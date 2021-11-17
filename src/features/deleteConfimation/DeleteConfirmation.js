import React from 'react';
import "./DeleteConfirmation.scss";
import { FaTimesCircle } from "react-icons/fa";
import {
  Container,
  Button,
  Modal,
} from 'react-bootstrap';

const DeleteConfirmation = (props) => {

  console.log(props);

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
            <Button className="deleteBtn">Delete</Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
