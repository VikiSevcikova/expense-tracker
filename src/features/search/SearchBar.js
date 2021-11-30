import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import "./SearchBar.scss";
import { BsSearch } from "react-icons/bs";
import { transactionListSelector, filterTransaction } from '../transactionList/transactionListSlice';

const SearchBar = () => {

  //private state
  const [keyword, setKeyword] = useState("");

  //redux
  const transactionList = useSelector(transactionListSelector);
  const dispatch = useDispatch();

  //method
  const searchTransaction = () => {
    const filteredTranList = transactionList.allTran.filter(elem => {
      if (elem.description.toLowerCase().includes(keyword.toLowerCase()) || elem.categoryName.toLowerCase().includes(keyword.toLowerCase())) {
        return elem;
      }
    });
    dispatch(filterTransaction(filteredTranList));
  };

  return (
    <>
      <InputGroup className="searchBar">
        <FormControl
          className="searchInput"
          placeholder=" Search transaction item here..."
          value={keyword}
          // onFocus={setKeyword("")}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          className="searchBtn"
          onClick={searchTransaction}
        >
          <BsSearch className="searchIcon" />
        </Button>
      </InputGroup>
    </>
  );
};

export default SearchBar;
