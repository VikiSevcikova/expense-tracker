import React, { useState, useEffect } from 'react';
import "./Paging.scss";
import { useDispatch } from "react-redux";
import Pagination from 'react-bootstrap/Pagination';
import {
  Container,
} from 'react-bootstrap';
import { getCurrentPageTransaction } from '../transactionList/transactionListSlice';

const Paging = (props) => {

  //private state
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [numOfTranPerPage] = useState(5);

  //paging num array
  const pageNumbersArray = [];
  const totalNumOfTran = props.tranList.length;
  for (let i = 1; i <= Math.ceil(totalNumOfTran / numOfTranPerPage); i++) {
    pageNumbersArray.push(i);
  }

  //redux
  const dispatch = useDispatch();

  //Get current transaction list
  const indexOfLastTran = currentPageNum * numOfTranPerPage; //5
  const indexOfFirstTran = indexOfLastTran - numOfTranPerPage; //0

  //when allTran or filteredTran is changed, recalculate the number of pages
  //When pageNum is changed, update the state
  useEffect(() => {
    const currentPageTranList = props.tranList.slice(indexOfFirstTran, indexOfLastTran); //0 - 4
    dispatch(getCurrentPageTransaction(currentPageTranList));
  }, [props.tranList, currentPageNum]);

  //change page
  const paginate = (pageNum) => {
    setCurrentPageNum(pageNum);
  };

  return (
    <>
      {pageNumbersArray.length !== 0 && (
        <>
          <Container fluid className="paginationContainer">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Ellipsis />
              {pageNumbersArray.map((num, index) => (
                <Pagination.Item
                  key={index}
                  onClick={() => paginate(num)}>{num}</Pagination.Item>
              ))}
              <Pagination.Ellipsis />
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Container>
        </>
      )}
    </>
  );
};

export default Paging;
