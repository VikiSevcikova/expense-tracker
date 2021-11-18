import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { changeOperation, enterTransactionSelector } from '../enterTransaction/enterTransactionSlice';
import "./EnterTransaction.scss";
import {
  Container,
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import { FaTimesCircle } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  showAlert,
  hideAlert
} from '../alertMessage/alertMessageSlice';
import DeleteConfirmation from '../deleteConfimation/DeleteConfirmation';
import { categories } from '../../utils/Categories';

const EditTransaction = (props) => {

  console.log(props);//coming from filter.js

  //router
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();

  // const preloadedValues = {
  //   date: props.checkedItem[0].date,
  //   categoryId: props.checkedItem[0].categoryId,
  //   categoryName: props.checkedItem[0].categoryName,
  //   transactionType: props.checkedItem[0].transactionType,
  //   description: props.checkedItem[0].description,
  //   currency: props.checkedItem[0].currency,
  //   amount: props.checkedItem[0].amount,
  //   paymentMethod: props.checkedItem[0].paymentMethod,
  //   // isDeleted: props.checkedItem[0].isDeleted,
  //   // isEditing: props.checkedItem[0].isEditing
  // };

  // const { register } = useForm({
  //   defaultValues: preloadedValues
  // });

  //Calendar filter
  const [date, setDate] = useState(new Date());

  //private state
  const [transaction, setTransaction] = useState({
    date: date,
    categoryId: 0, //default 0 : need to get from backend
    categoryName: "",
    transactionType: "",
    description: "",
    currency: "CAD",
    amount: 0,
    paymentMethod: "",
    isDeleted: false,
    isEditing: false
  });

  //Modal pop up (delete conf)
  const [delConf, setShowDelConf] = useState(false);
  const closeDelConf = () => setShowDelConf(false);
  const showDelConf = () => setShowDelConf(true);

  //method
  //prefill edit form
  useEffect(() => {
    console.log("I am prefilling the form", props.operationType);
    setTransaction({
      date: props.checkedItem[0].date.substr(0, 10).replace(/-/g, "/"),
      categoryId: props.checkedItem[0].categoryId,
      categoryName: props.checkedItem[0].categoryName,
      transactionType: props.checkedItem[0].transactionType,
      description: props.checkedItem[0].description,
      currency: props.checkedItem[0].currency,
      amount: props.checkedItem[0].amount,
      paymentMethod: props.checkedItem[0].paymentMethod,
      isDeleted: props.checkedItem[0].isDeleted,
      isEditing: props.checkedItem[0].isEditing
    });
  }, [props.operationType === "edit"]);

  //onChange
  const handleChange = (prop) => (e) => {
    //get category id based on category name
    if (prop === "categoryName") {
      const targetCategory = categories.find(elem => elem.name === e.target.value);
      setTransaction(
        {
          ...transaction,
          ["categoryId"]: targetCategory.id,
          [prop]: e.target.value
        }
      );
    } else {
      setTransaction({ ...transaction, [prop]: e.target.value });
    }
  };

  //onSubmit
  const handleSubmit = async (e) => {

    console.log(e);
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json"
      },
    };

    //Add new transaction
    try {
      //validation check
      if (transaction.transactionType === "" || transaction.categoryName === "" || transaction.amount === 0 || transaction.paymentMethod === "") {
        setTimeout(() => {
          dispatch(hideAlert());
        }, 5000);
        dispatch(showAlert({ message: "Please fill in all the required fields", variant: "danger" }));
        return;
      } else {
        //send data to backend
        const response = await axios.post("http://localhost:5000/alltransaction/add", transaction, config);
        console.log(response);
        if (response.statusText !== "OK") {
          throw response.statusText;
        } else {
          //close modal pop-up
          props.handleClose();
          //go back to alltransaction page
          navigate("/alltransaction", {
            state: response.data
          });
        }
      }
    } catch (error) {
      console.error(`${error}: Something wrong on the server side`);
      return error;
    }

  };

  return (
    <>
      <Modal
        className="editModal"
        show={props.show} //coming from filter.js
        fullscreen
      >
        <Container fluid className="editTransactionContainer">
          {/* Header */}
          <Modal.Header>
            {/* <Modal.Title>Enter Transaction</Modal.Title> */}
            {props.operationType === "add" ?
              <Modal.Title>Add New Transaction</Modal.Title> :
              <Modal.Title>Edit Transaction</Modal.Title>}
            <FaTimesCircle
              className="modalClsBtn"
              onClick={props.handleClose} />
          </Modal.Header>

          {/* Body */}
          <Modal.Body>
            <Form
              className="editForm"
              onSubmit={handleSubmit}>
              <Form.Group className="transactionType">
                <Form.Check
                  type="radio"
                  value="income"
                  checked={transaction.transactionType === "income" && true}
                  label="Income"
                  onChange={handleChange("transactionType")} />
                <Form.Check
                  type="radio"
                  value="expense"
                  checked={transaction.transactionType === "expense" && true}
                  label="Expense"
                  onChange={handleChange("transactionType")} />
              </Form.Group>

              <Container fluid>
                <Form.Group className="transactionDate">
                  <Form.Label>Choose a Date *</Form.Label>
                  <DatePicker
                    required
                    selected={date}
                    value={transaction.date}
                    onChange={(date) => setDate(date)} />
                </Form.Group>

                <Form.Group className="transactionCategory">
                  <Form.Label>Select a Category *</Form.Label>
                  <Form.Select
                    required
                    defaultValue="Choose..."
                    value={transaction.categoryName}
                    onChange={handleChange("categoryName")}>
                    <option>Choose...</option>
                    {categories.map((elem, index) => (
                      <>
                        <option key={index}>{elem.name}</option>
                      </>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="transactionAmount" >
                  <Form.Label>Enter an Amount *</Form.Label>
                  <Form.Control
                    required type="text"
                    placeholder="$"
                    value={transaction.amount}
                    onFocus={() => setTransaction({ ...transaction, ["amount"]: "" })}
                    onChange={handleChange("amount")} />
                </Form.Group>

                <Form.Group className="transactionDescription" >
                  <Form.Label>Desctription</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter item description..."
                    value={transaction.description}
                    onFocus={() => setTransaction({ ...transaction, ["description"]: "" })}
                    onChange={handleChange("description")} />
                </Form.Group>
              </Container>

              <Form.Group className="paymentMethod">
                <Form.Label>Payment Method *</Form.Label>
                <Form.Check
                  type="radio"
                  label="Debit Card"
                  value="Debit Card"
                  checked={transaction.paymentMethod === "Debit Card" && true}
                  onChange={handleChange("paymentMethod")} />
                <Form.Check
                  type="radio"
                  label="Credit Card"
                  value="Credit Card"
                  checked={transaction.paymentMethod === "Credit Card" && true}
                  onChange={handleChange("paymentMethod")} />
                <Form.Check
                  type="radio"
                  label="Cash"
                  value="Cash"
                  checked={transaction.paymentMethod === "Cash" && true}
                  onChange={handleChange("paymentMethod")} />
              </Form.Group>

              <Container className="buttons">
                <Button className="saveBtn" type="submit">Save</Button>
                <Button
                  className="deleteBtn"
                  onClick={showDelConf}>Delete</Button>

                {delConf && <DeleteConfirmation show={delConf} closeDelConf={closeDelConf} />}
              </Container>

            </Form>
          </Modal.Body>
        </Container>
      </Modal>
    </>
  );
};

export default EditTransaction;
