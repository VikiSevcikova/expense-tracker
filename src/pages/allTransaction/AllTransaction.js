import React from 'react';
import Greeting from '../../features/greeting/Greeting';
import SearchBar from '../../features/searchBar/SearchBar';

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
