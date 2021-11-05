import React from "react";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import "./Navbar.scss";
import { RiProfileLine } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";

export default function Navbar() {
  const btnOnClick = (e) => {
    let name = e.target.parentElement.classList.add("active")
    console.log(e.target.parentElement.childNodes[1]);
    console.log(e.target.parentElement.childNodes[0]);
    // e.target.parentElement.classList
  };

  return (
    <div style={{ width: "100px", height: "100vh" }}>
      <Nav
        className="h-100 w-100 align-items-center justify-content-center"
        style={{ backgroundColor: "#3F85A4" }}
      >
        <Nav.Item className="position-relative">
          <Image
            src="/images/et-logo.png"
            alt="expense_tracker_logo"
            className="w-75"
          />
        </Nav.Item>
        <Nav.Link className="navBtn" onClick={(e)=>btnOnClick(e)}>
          <RiProfileLine size={50} />
          <p>Dashboard</p>
        </Nav.Link>
        <Nav.Link className="navBtn">
          <AiOutlineTransaction size={50} />
          <p>Transactions</p>
        </Nav.Link>
        <Nav.Link className="navBtn">
          <Image
            src="https://via.placeholder.com/50"
            alt="profile_image"
            roundedCircle
          />
          <p>Account</p>
        </Nav.Link>
        <Nav.Item className="navBtn">
          <GrLogout size={40} />
          <p>Logout</p>
        </Nav.Item>
      </Nav>
    </div>
  );
}
