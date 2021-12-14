import React from "react";
import DashBoardCards from "../../features/dashBoardCards/DashBoardCards";
import { Container } from "react-bootstrap";

export default function Dashboard() {
  return (
      <Container fluid>
        <DashBoardCards/>
      </Container>
  );
}
