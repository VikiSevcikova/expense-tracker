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
  const sortTransaction = (sortOrder, sortBy) => {

    console.log("sort clicked");

    let sortedTran = [];
    switch (sortOrder) {
      case "alphabet":
        sortedTran = props.tranList.slice().sort((a, b) => (a[`${sortBy}`].localeCompare(b[`${sortBy}`])));
        break;
      case "number":
        const expense = props.tranList.filter(e => e.transactionType === "expense").sort((a, b) => (b[`${sortBy}`] - (a[`${sortBy}`])));
        const income = props.tranList.filter(e => e.transactionType === "income").sort((a, b) => (a[`${sortBy}`] - (b[`${sortBy}`])));
        sortedTran = expense.concat(income);
        break;
      case "date":
        sortedTran = props.tranList.slice().sort((a, b) => (new Date(b[`${sortBy}`]) - new Date(a[`${sortBy}`])));
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
      // menuVariant="dark"
      >
        {/* Self-invoking function : to change icon */}
        {(() => {
          switch (props.sortOrder) {
            case "alphabet":
              return (
                <>
                  <Dropdown.Item >
                    <BsSortAlphaDown
                      className="sortIcon"
                      onClick={() => sortTransaction("alphabet", props.sortBy)} />
                  </Dropdown.Item>
                  <Dropdown.Item >
                    <BsSortAlphaDownAlt className="sortIcon" />
                  </Dropdown.Item>
                </>
              );
            case "number":
              return (
                <>
                  <Dropdown.Item >
                    <BsSortNumericDown
                      className="sortIcon"
                      onClick={() => sortTransaction("number", props.sortBy)} />
                  </Dropdown.Item>
                  <Dropdown.Item >
                    <BsSortNumericUpAlt className="sortIcon" />
                  </Dropdown.Item>
                </>
              );
            case "date":
              return (
                <>
                  <Dropdown.Item >
                    <BsSortDown
                      className="sortIcon"
                      onClick={() => sortTransaction("date", props.sortBy)} />
                  </Dropdown.Item>
                  <Dropdown.Item >
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
