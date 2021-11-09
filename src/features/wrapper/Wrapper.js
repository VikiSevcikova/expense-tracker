import React from "react";
import Navbar from "../navbar/Navbar";
import "./Wrapper.scss";

export default function Wrapper({ children }) {
  return (
    <div className="wrapper">
      {/* <Navbar /> */}
      <div className="main">
        {children}
      </div>
    </div>
  );
}
