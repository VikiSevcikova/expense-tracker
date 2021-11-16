import React, { useState, useEffect } from 'react';
import useMedia from "use-media";
import { useLocation } from 'react-router-dom';
import {
  Container,
  Table
} from 'react-bootstrap';
import "./TransactionList.scss";
import { BsFillCaretDownFill } from "react-icons/bs";
import {
  MdOutlineCategory,
  MdAttachMoney,
  MdCheckBoxOutlineBlank,
  MdCheckBox
} from "react-icons/md";
import Paging from '../pagination/Paging';

const TransactionList = () => {

  const location = useLocation();
  console.log(location.state);

  //private state : transaction list
  const [transactionList, setTransactionList] = useState();

  useEffect(() => {
    //get request to get all transaction list when the component is mounted

  }, [location.state]);

  //Media query
  const isLG = useMedia({ minWidth: "992px" }); //lg
  const isXL = useMedia({ minWidth: "1200px" }); //xl
  const isXXL = useMedia({ minWidth: "1400px" }); //xxl

  return (
    <>
      <Container fluid className="transactionListContainer">
        {!(isLG || isXL || isXXL) ? (
          <>
            {/* Mobile view */}
            <Table className="transactionList">
              <thead className="tableTitle">
                <tr>
                  <th><MdCheckBoxOutlineBlank /></th>
                  <th className="titleCategory"><MdOutlineCategory /> Category <BsFillCaretDownFill /></th>
                  <th className="titleAmount"><MdAttachMoney /> <BsFillCaretDownFill /></th>
                </tr>
              </thead>
              <tbody className="tableBody">
                <tr>
                  <td><MdCheckBoxOutlineBlank /></td>
                  <td className="tdLeft">
                    <p className="category">Food</p>
                    <p>Chocolate, pizza, groceries</p>
                    <p className="paymentMethod">Debit card</p>
                  </td>
                  <td className="tdRight">
                    <p>$100</p>
                    <p>2021/11/08</p>
                  </td>
                </tr>
                <tr>
                  <td><MdCheckBoxOutlineBlank /></td>
                  <td className="tdLeft">
                    <p className="category">Food</p>
                    <p>Chocolate, pizza, groceries</p>
                    <p className="paymentMethod">Credit card</p>
                  </td>
                  <td className="tdRight">
                    <p className="negativeAmount">-$100</p>
                    <p>2021/11/08</p>
                  </td>
                </tr>
                <tr>
                  <td><MdCheckBoxOutlineBlank /></td>
                  <td className="tdLeft">
                    <p className="category">Food</p>
                    <p>Chocolate, pizza, groceries</p>
                    <p className="paymentMethod">Debit card</p>
                  </td>
                  <td className="tdRight">
                    <p>$100</p>
                    <p>2021/11/08</p>
                  </td>
                </tr>
                <tr>
                  <td><MdCheckBoxOutlineBlank /></td>
                  <td className="tdLeft">
                    <p className="category">Food</p>
                    <p>Chocolate, pizza, groceries</p>
                    <p className="paymentMethod">Debit card</p>
                  </td>
                  <td className="tdRight">
                    <p>$100</p>
                    <p>2021/11/08</p>
                  </td>
                </tr>
                <tr className="paging">
                  <td colSpan="6"><Paging /></td>
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
                  <th className="titleCategory">Category <BsFillCaretDownFill /></th>
                  <th className="titleCategory">Date <BsFillCaretDownFill /></th>
                  <th className="titleCategory">Payment Method <BsFillCaretDownFill /></th>
                  <th className="titleCategory">Description <BsFillCaretDownFill /></th>
                  <th className="titleCategory">Amount <BsFillCaretDownFill /></th>
                </tr>
              </thead>
              <tbody className="tableBody">
                <tr>
                  <td><MdCheckBoxOutlineBlank /></td>
                  <td>Food</td>
                  <td>2021/11/05</td>
                  <td>Debit card</td>
                  <td>Chocolate, pizza, groceries</td>
                  <td>$20</td>
                </tr>
                <tr>
                  <td><MdCheckBoxOutlineBlank /></td>
                  <td>Food</td>
                  <td>2021/11/05</td>
                  <td>Debit card</td>
                  <td>Chocolate, pizza, groceries</td>
                  <td className="negativeAmount">-$20</td>
                </tr>
                <tr>
                  <td><MdCheckBoxOutlineBlank /></td>
                  <td>Food</td>
                  <td>2021/11/05</td>
                  <td>Debit card</td>
                  <td>Chocolate, pizza, groceries</td>
                  <td>$20</td>
                </tr>
                <tr>
                  <td><MdCheckBoxOutlineBlank /></td>
                  <td>Food</td>
                  <td>2021/11/05</td>
                  <td>Debit card</td>
                  <td>Chocolate, pizza, groceries</td>
                  <td className="negativeAmount">-$120</td>
                </tr>
                <tr className="paging">
                  <td colSpan="6"><Paging /></td>
                </tr>
              </tbody>
            </Table>

          </>
        )}
      </Container>
    </>
  );
};

export default TransactionList;
