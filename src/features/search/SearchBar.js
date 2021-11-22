import React from 'react';
import {
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import "./SearchBar.scss";
import { BsSearch } from "react-icons/bs";


const SearchBar = () => {
  return (
    <>
      <InputGroup className="searchBar">
        <FormControl
          className="searchInput"
          placeholder=" Search transaction item here..."
        />
        <Button
          className="searchBtn"
        >
          <BsSearch className="searchIcon" />
        </Button>
      </InputGroup>
    </>
  );
};

export default SearchBar;
