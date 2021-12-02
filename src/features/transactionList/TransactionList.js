import React, { useState, useEffect } from 'react';
import useMedia from "use-media";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { transactionListSelector, filterTransaction } from './transactionListSlice';
import { changeOperation, enterTransactionSelector } from '../enterTransaction/enterTransactionSlice';
import {
  Container,
  Table,
  Form
} from 'react-bootstrap';
import "./TransactionList.scss";
import { BsSortUp, BsSortAlphaDown, BsSortNumericDown } from "react-icons/bs";
import {
  MdOutlineCategory,
  MdAttachMoney,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import Paging from '../pagination/Paging';

const TransactionList = () => {

  //Media query
  const isLG = useMedia({ minWidth: "992px" }); //lg
  const isXL = useMedia({ minWidth: "1200px" }); //xl
  const isXXL = useMedia({ minWidth: "1400px" }); //xxl

  //redux
  const dispatch = useDispatch();
  const transactionList = useSelector(transactionListSelector);
  const operation = useSelector(enterTransactionSelector);

  //private state
  const [tranList, setTranList] = useState([]);

  //method
  //when the component is mounted
  useEffect(() => {
    transactionList.filteredTran.length !== 0 ?
      setTranList(transactionList.filteredTran) :
      setTranList(transactionList.allTran);
  }, [transactionList]);

  //Checkbox control -- under construction
  const handleCheck = (_id, e) => {
    const payload = tranList.filter(e => e._id == _id);
    //when it is checked, delete or edit action can be done
    if (e.target.checked) {
      //change isEditing true only for the selected item and edit/delete button visible
      dispatch(changeOperation({
        editDelBtnVisible: true,
        checkedItem: {
          _id: payload[0]._id,
          date: payload[0].date,
          categoryId: payload[0].categoryId,
          categoryName: payload[0].categoryName,
          transactionType: payload[0].transactionType,
          description: payload[0].description,
          currency: payload[0].currency,
          amount: payload[0].amount,
          paymentMethod: payload[0].paymentMethod,
          isDeleted: payload[0].isDeleted,
          isEditing: true
        } 
      }));
    }
    else {
      //change isEditing back to false and edit/delete button invisible
      dispatch(changeOperation({
        editDelBtnVisible: false,
        checkedItem: {
          _id: payload[0]._id,
          date: payload[0].date,
          categoryId: payload[0].categoryId,
          categoryName: payload[0].categoryName,
          transactionType: payload[0].transactionType,
          description: payload[0].description,
          currency: payload[0].currency,
          amount: payload[0].amount,
          paymentMethod: payload[0].paymentMethod,
          isDeleted: payload[0].isDeleted,
          isEditing: false
        } 
      }));
    }
  };

  //sorting method
  const sortTransaction = (sortOrder, sortBy) => {
    let sortedTran = [];
    switch (sortOrder) {
      case "alphabet":
        sortedTran = tranList.slice().sort((a, b) => (a[`${sortBy}`].localeCompare(b[`${sortBy}`])));
        break;
      case "number":
        const expense = tranList.filter(e => e.transactionType === "expense").sort((a, b) => (b[`${sortBy}`] - (a[`${sortBy}`])));
        const income = tranList.filter(e => e.transactionType === "income").sort((a, b) => (a[`${sortBy}`] - (b[`${sortBy}`])));
        sortedTran = expense.concat(income);
        break;
      case "date":
        sortedTran = tranList.slice().sort((a, b) => (new Date(b[`${sortBy}`]) - new Date(a[`${sortBy}`])));
        break;
      default:
        break;
    }
    dispatch(filterTransaction(sortedTran));
  };

  return (
    <>
      <Container fluid className="transactionListContainer">
        {!transactionList.currentPageTran.length == 0 ?
          (<>
            {!(isLG || isXL || isXXL) ? (
              <>
                {/* Mobile view */}
                <Table className="transactionList">
                  <thead className="tableTitle">
                    <tr>
                      <th><MdCheckBoxOutlineBlank /></th>
                      <th
                        className="title"
                        onClick={() => sortTransaction("alphabet", "categoryName")} >
                        <MdOutlineCategory />
                        Category
                        <BsSortAlphaDown className="sortIcon" />
                      </th>
                      <th
                        className="titleAmount"
                        onClick={() => sortTransaction("number", "amount")}>
                        <MdAttachMoney />
                        <BsSortNumericDown className="sortIcon" /></th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {transactionList.currentPageTran.map((elem, index) => (
                      <>
                        <tr key={index}>
                          <td><Form.Check
                            checked={
                              operation.editDelBtnVisible === true &&
                              operation.checkedItem._id === elem._id && true}
                            disabled={
                              operation.editDelBtnVisible === true &&
                                operation.checkedItem._id !== elem._id ? true : false}
                            onClick={(e) => handleCheck(elem._id, e)} /></td>
                          <td className="tdLeft">
                            <p className="category">{elem.categoryName}</p>
                            <p>{elem.description}</p>
                            <p className="paymentMethod">{elem.paymentMethod}</p>
                          </td>
                          <td className="tdRight">
                            {elem.transactionType === "expense" ?
                              <p className="negativeAmount">-${elem.amount}</p> :
                              <p>${elem.amount}</p>}
                            <p>{elem.date.substr(0, 10).replace(/-/g, "/")}</p>
                          </td>
                        </tr>
                      </>
                    ))}
                    <tr className="paging">
                      <td colSpan="6"><Paging tranList={tranList} /></td>
                    </tr>
                  </tbody>
                </Table>
              </>
            ) : (
              <>
                {/* Desktop view */}
                <Table className="transactionList">
                  <thead className="tableTitle">
                    <tr>
                      <th><MdCheckBoxOutlineBlank /></th>
                      <th
                        className="title"
                        onClick={() => sortTransaction("alphabet", "categoryName")} >
                        Category
                        <BsSortAlphaDown className="sortIcon" />
                      </th>
                      <th
                        className="title"
                        onClick={() => sortTransaction("date", "date")}
                      >
                        Date
                        <BsSortUp className="sortIcon" />
                      </th>
                      <th
                        className="title"
                        onClick={() => sortTransaction("alphabet", "paymentMethod")}>
                        Payment Method
                        <BsSortAlphaDown className="sortIcon" />
                      </th>
                      <th
                        className="title"
                        onClick={() => sortTransaction("alphabet", "description")}>
                        Description
                        <BsSortAlphaDown className="sortIcon" />
                      </th>
                      <th
                        className="title"
                        onClick={() => sortTransaction("number", "amount")}>
                        Amount
                        <BsSortNumericDown className="sortIcon" /></th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {transactionList.currentPageTran.map((elem, index) => (
                      <>
                        <tr key={elem._id}>
                          <td><Form.Check
                            checked={
                              operation.editDelBtnVisible === true &&
                              operation.checkedItem._id === elem._id && true}
                            disabled={
                              operation.editDelBtnVisible === true &&
                                operation.checkedItem._id !== elem._id ? true : false}
                            onClick={(e) => handleCheck(elem._id, e)} /></td>
                          <td>{elem.categoryName}</td>
                          <td>{elem.date.substr(0, 10).replace(/-/g, "/")}</td>
                          <td>{elem.paymentMethod}</td>
                          <td>{elem.description}</td>
                          {elem.transactionType === "expense" ?
                            <td className="negativeAmount">-${elem.amount}</td> :
                            <td>${elem.amount}</td>}
                        </tr>
                      </>
                    ))}
                    <tr className="paging">
                      <td colSpan="6"><Paging tranList={tranList} /></td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </>) : (
            <>
              <Container className="noTranContainer">
                <h2>No Transaction Added yet</h2>
                <Paging tranList={tranList} />
              </Container>
            </>)}
      </Container>
    </>
  );
};

export default TransactionList;
