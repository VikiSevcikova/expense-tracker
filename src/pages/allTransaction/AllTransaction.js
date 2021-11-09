import React from 'react';
import Greeting from '../../features/greetings/Greeting';
import SearchBar from '../../features/search/SearchBar';
import Filter from "../../features/filter/Filter";
import TransactionList from '../../features/transactionList/TransactionList';
import "./AllTransaction.scss";
import {
  Container,
} from 'react-bootstrap';

const AllTransaction = () => {
  return (
    <>
      <Container
        className="transactionContainer"
        fluid>
        <header>
          <Greeting />
          <h1 className="pageTitle">All Transaction</h1>
        </header>
        <SearchBar />
        <Filter />
        <TransactionList />
      </Container>
    </>
  );
};

export default AllTransaction;
