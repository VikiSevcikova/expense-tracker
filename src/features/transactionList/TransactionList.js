import React, { useState } from 'react';
import {
  Container,
  Col,
  Button,
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

const TransactionList = () => {
  return (
    <>
      <Container fluid className="transactionListContainer">

        {/* Mobile view */}
        <Table className="transactionList mobileTrxList">
          <thead className="tableTitle mobileTableTitle">
            <tr>
              <th><MdCheckBoxOutlineBlank /></th>
              <th className="titleCategory"><MdOutlineCategory /> Category <BsFillCaretDownFill /></th>
              <th className="titleAmount"><MdAttachMoney /> <BsFillCaretDownFill /></th>
            </tr>
          </thead>
          <tbody className="tableBody mobileTableBody">
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
          </tbody>
        </Table>

      </Container>
    </>
  );
};

export default TransactionList;
