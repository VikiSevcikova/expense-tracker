import React from "react";
import DashBoardCards from "../../features/dashBoardCards/DashBoardCards";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userProfile/userSlice";
import { Container } from "react-bootstrap";

export default function Dashboard() {
  const user = useSelector(selectUser)
  return (
    // <div className="dashBoard_wrapper">
      <Container fluid>
        <DashBoardCards/>
      </Container>
    // </div>
  );
}
