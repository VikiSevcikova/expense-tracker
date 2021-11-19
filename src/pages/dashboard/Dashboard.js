import React from "react";
import DashBoardCards from "../../features/dashBoardCards/DashBoardCards";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userProfile/userSlice";

export default function Dashboard() {
  const user = useSelector(selectUser)
  return (
    <div className="dashBoard_wrapper">
      <DashBoardCards/>
    </div>
  );
}
