import React from 'react';
import "./Paging.scss";
import Pagination from 'react-bootstrap/Pagination';
import {
  Container,
} from 'react-bootstrap';

const Paging = () => {
  return (
    <>
      <Container fluid className="paginationContainer">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Ellipsis />
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item>{5}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Container>
    </>
  );
};

export default Paging;
