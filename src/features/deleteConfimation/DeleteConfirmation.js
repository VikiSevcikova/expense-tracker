import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeOperation } from '../enterTransaction/enterTransactionSlice';
import "./DeleteConfirmation.scss";
import { FaTimesCircle } from "react-icons/fa";
import {
  Container,
  Button,
  Modal,
} from 'react-bootstrap';

const DeleteConfirmation = (props) => {

  //router
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();

  //method
  const handleDelete = async (id) => {

    const config = {
      headers: {
        "Content-type": "application/json"
      },
    };

    //send data to backend - delete single tran
    try {
      const response = await axios.delete(`http://localhost:5000/alltransaction/delete/${id}`, config);

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

    //close edit transaction modal
    props.handleClose();
    //hide edit and delete button on the filter
    dispatch(changeOperation({
      editDelBtnVisible: false,
      checkedItem: []
    }));
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
            {props.delete === "transaction" ?
              <p> Are you sure you want to delete the transaction?</p>
              : <p> Are you sure you want to delete your account?</p>}

          </Modal.Body>
          <Modal.Footer>
            <Button
              className="cancelBtn"
              onClick={props.closeDelConf}>Cancel</Button>
            <Button
              className="deleteBtn"
              onClick={() => handleDelete(props.checkedItemId)}>Delete</Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
