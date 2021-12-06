import React from 'react';
import "./SortDropdown.scss";
import {
  DropdownButton,
  Dropdown
} from 'react-bootstrap';
import { BsFillCaretDownFill, BsSortUpAlt, BsSortDown, BsSortAlphaDown, BsSortAlphaDownAlt, BsSortNumericUpAlt, BsSortNumericDown } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { filterTransaction } from '../transactionList/transactionListSlice';

const SortDropdown = (props) => {

  //redux
  const dispatch = useDispatch();

  //sorting method
  const sortTransaction = (sortOrder, sortBy, order) => {

    let sortedTran = [];
    switch (sortOrder) {
      case "alphabet":
        if (order === "asc") {
          sortedTran = props.tranList.slice().sort((a, b) => (a[`${sortBy}`].localeCompare(b[`${sortBy}`])));
        } else {
          sortedTran = props.tranList.slice().sort((a, b) => (b[`${sortBy}`].localeCompare(a[`${sortBy}`])));
        }
        break;
      case "number":
        let expense;
        let income;
        if (order === "asc") {
          expense = props.tranList.filter(e => e.transactionType === "expense").sort((a, b) => (b[`${sortBy}`] - (a[`${sortBy}`])));
          income = props.tranList.filter(e => e.transactionType === "income").sort((a, b) => (a[`${sortBy}`] - (b[`${sortBy}`])));
          sortedTran = expense.concat(income);
        } else {
          expense = props.tranList.filter(e => e.transactionType === "expense").sort((a, b) => (a[`${sortBy}`] - (b[`${sortBy}`])));
          income = props.tranList.filter(e => e.transactionType === "income").sort((a, b) => (b[`${sortBy}`] - (a[`${sortBy}`])));
          sortedTran = income.concat(expense);
        }
        break;
      case "date":
        console.log(props.tranList);
        if (order === "asc") {
          sortedTran = props.tranList.slice().sort((a, b) => (new Date(a[`${sortBy}`]) - new Date(b[`${sortBy}`])));
        } else {
          sortedTran = props.tranList.slice().sort((a, b) => (new Date(b[`${sortBy}`]) - new Date(a[`${sortBy}`])));
        }
        break;
      default:
        break;
    }
    dispatch(filterTransaction(sortedTran));
  };

  return (
    <>
      <DropdownButton
        className="sortDropdown"
        variant="secondary"
      >
        {/* Self-invoking function : to change icon */}
        {(() => {
          switch (props.sortOrder) {
            case "alphabet":
              return (
                <>
                  <Dropdown.Item
                    onClick={() => sortTransaction(props.sortOrder, props.sortBy, "asc")}>
                    <BsSortAlphaDown className="sortIcon" />
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => sortTransaction(props.sortOrder, props.sortBy, "desc")}>
                    <BsSortAlphaDownAlt className="sortIcon" />
                  </Dropdown.Item>
                </>
              );
            case "number":
              return (
                <>
                  <Dropdown.Item
                    onClick={() => sortTransaction(props.sortOrder, props.sortBy, "asc")} >
                    <BsSortNumericDown className="sortIcon" />
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => sortTransaction(props.sortOrder, props.sortBy, "desc")}>
                    <BsSortNumericUpAlt className="sortIcon" />
                  </Dropdown.Item>
                </>
              );
            case "date":
              return (
                <>
                  <Dropdown.Item
                    onClick={() => sortTransaction(props.sortOrder, props.sortBy, "asc")}>
                    <BsSortDown className="sortIcon" />
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => sortTransaction(props.sortOrder, props.sortBy, "desc")}>
                    <BsSortUpAlt className="sortIcon" />
                  </Dropdown.Item>
                </>
              );
            default:
              break;
          }
        })()}
      </DropdownButton>
    </>
  );
};

export default SortDropdown;
