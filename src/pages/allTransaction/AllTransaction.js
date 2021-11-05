import React from 'react';
import Greeting from '../../features/greetings/Greeting';
import SearchBar from '../../features/search/SearchBar';
import "./AllTransaction.scss"

const AllTransaction = () => {
  return (
    <>

      <header>
        <Greeting />
        <h1 className="pageTitle">All Transaction</h1>
      </header>
      <SearchBar />
    </>
  );
};

export default AllTransaction;
