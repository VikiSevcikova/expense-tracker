import React from 'react';
import {
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';


const SearchBar = () => {
  return (
    <>
      <InputGroup className="searchBar">
        <FormControl
          placeholder="Search Transaction Item"
          aria-label="Search Transaction Item"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
    </>
  );
};

export default SearchBar;
