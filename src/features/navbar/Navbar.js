import React from "react";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import "./Navbar.scss";
import { RiProfileLine } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdLogout } from "react-icons/md";


export default function Navbar() {

  return (
      <div className="nav_wrapper">
        <Nav
          className="navbar h-100 w-100 align-items-center justify-content-center"
         
        >
          <Nav.Item className="position-relative">
            <Image
              src="/images/et-logo.png"
              alt="expense_tracker_logo"
              className="w-75"
            />
          </Nav.Item>
          <Nav.Link
            href="/dashboard"
            className="navBtn"
            // onClick={(e) => btnOnClick(e)}
          >
            <RiProfileLine size={50} />
            <p>Dashboard</p>
          </Nav.Link>
          <Nav.Link href="/alltransaction" className="navBtn">
            <AiOutlineTransaction size={50} />
            <p>Transactions</p>
          </Nav.Link>
          <Nav.Link href="/" className="navBtn">
            <Image
              src="https://via.placeholder.com/50"
              alt="profile_image"
              roundedCircle
            />
            <p>Account</p>
          </Nav.Link>
          <Nav.Item className="navBtn">
            <MdLogout size={40} />
            <p>Logout</p>
          </Nav.Item>
        </Nav>
      </div>
  );
}
