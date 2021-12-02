import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeOperation } from '../enterTransaction/enterTransactionSlice';
import "./DeleteConfirmation.scss";
import { FaTimesCircle } from "react-icons/fa";
import {
  Container,
  Button,
  Modal,
} from 'react-bootstrap';
import {
  showAlert
} from '../alertMessage/alertMessageSlice';
import { removeUser, selectUser } from "../userProfile/userSlice";
import { getHeaderConfig } from '../../utils/utils';

const DeleteConfirmation = (props) => {

  //router
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();
  const { token } = useSelector(selectUser);

  //method
  const logOut = () => {
      dispatch(removeUser());
      dispatch(showAlert({
        message: "You were logged out. Bye.",
        variant: "info",
      }));
      navigate("/login");
  };

  //delete account
  const handleDelete = async (id) => {
    switch (props.delete) {
      case "transaction":
        //send data to backend - delete single tran
        try {
          const response = await axios.delete(`/alltransaction/delete/${id}`, getHeaderConfig(token));

          if (response.statusText !== "OK") {
            throw response.statusText;
          } else {
            //close modal pop-up
            props.closeDelConf();
            //go back to alltransaction page
            navigate("/alltransaction", {
              state: response.data
            });
            //show delete confirmation message
            dispatch(
              showAlert({
                message: "Transaction has successfully been deleted",
                variant: "info",
              })
            );
          }
        } catch (error) {
          //show delete error message
          dispatch(
            showAlert({
              message: "Sorry, something went wrong on the server side",
              variant: "info",
            })
          );
          console.error(`${error}: Something wrong on the server side`);
          return error;
        }
        //close edit transaction modal
        props.handleClose();
        //hide edit and delete button on the filter
        dispatch(changeOperation({
          editDelBtnVisible: false,
          checkedItem: {}
        }));
        break;
      case "userAccount":
        //send data to backend - delete single tran
        try {
          const response = await axios.delete(`/users/delete`, getHeaderConfig(token));

          if (response.statusText !== "OK") {
            throw response.statusText;
          } else {
            //close modal pop-up
            props.closeDelConf();
            //logout
            logOut();
          }
        } catch (error) {
          console.error(`${error}: Something went wrong on the server side`);
          return error;
        }
        break;
      default:
        console.error("delete type undefined");
        break;
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
