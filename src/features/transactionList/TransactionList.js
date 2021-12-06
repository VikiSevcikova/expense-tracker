import React, { useState, useEffect } from 'react';
import useMedia from "use-media";
import { useSelector, useDispatch } from "react-redux";
import { transactionListSelector, filterTransaction } from './transactionListSlice';
import { changeOperation, enterTransactionSelector } from '../enterTransaction/enterTransactionSlice';
import {
  Container,
  Table,
  Form
} from 'react-bootstrap';
import "./TransactionList.scss";
import { BsSortUpAlt, BsSortDown, BsSortAlphaDown, BsSortAlphaDownAlt, BsSortNumericUpAlt, BsSortNumericDown } from "react-icons/bs";
import {
  MdOutlineCategory,
  MdAttachMoney,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import Paging from '../pagination/Paging';
import moment from "moment";
import SortDropdown from '../sortDropdown/SortDropdown';

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
  const [asc, setAsc] = useState(false);

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
                        className="title"          >
                        <MdOutlineCategory />
                        Category
                        <SortDropdown
                          tranList={tranList}
                          sortOrder="alphabet"
                          sortBy="paymentMethod" />
                      </th>
                      <th
                        className="titleAmount" >
                        <MdAttachMoney />
                        <SortDropdown
                          tranList={tranList}
                          sortOrder="number"
                          sortBy="amount" />
                      </th>
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
                            <p>{moment(new Date(elem.date)).local().format('YYYY/MM/DD')}</p>
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
                        className="title" >
                        Category
                        <SortDropdown
                          tranList={tranList}
                          sortOrder="alphabet"
                          sortBy="categoryName" />
                      </th>
                      <th
                        className="title"  >
                        Date
                        <SortDropdown
                          tranList={tranList}
                          sortOrder="date"
                          sortBy="amount" />
                      </th>
                      <th
                        className="title"   >
                        Payment Method
                        <SortDropdown
                          tranList={tranList}
                          sortOrder="alphabet"
                          sortBy="paymentMethod" />
                      </th>
                      <th
                        className="title" >
                        Description
                        <SortDropdown
                          tranList={tranList}
                          sortOrder="alphabet"
                          sortBy="description" />
                      </th>
                      <th
                        className="title"  >
                        Amount
                        <SortDropdown
                          tranList={tranList}
                          sortOrder="number"
                          sortBy="amount" />
                      </th>
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
                          <td>{moment(new Date(elem.date)).local().format('YYYY/MM/DD')}</td>
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
