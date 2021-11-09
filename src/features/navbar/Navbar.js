import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import "./Navbar.scss";
import { RiProfileLine } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Navbar() {
  const navigate = useNavigate();
  // const menuOnClick = () =>{
  //   const dropdown = document.getElementsByClassName('nav-dropdown')[0]
  //   console.log(dropdown.style.display = 'block')
  //   // dropdown.s
  // }

  const [menuOnClick, setMenuOnClick] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  }

  return (
    <Nav className="navbar text-center">
      <div className="nav-banner">
        <div className="nav-menu" onClick={() => setMenuOnClick(!menuOnClick)}>
          <BiMenu size={50} />
        </div>
        <h1 className="et-title">Expense Trackify</h1>
        <Nav.Item className="nav-logo">
          <Image
            src="/images/et-logo.png"
            alt="expense_tracker_logo"
            className=" w-100"
          />
        </Nav.Item>
        <div className="nav-icon">
          <Nav.Item className="nav-logo">
            <Image
              src="/images/et-logo.png"
              alt="expense_tracker_logo"
              className=" w-100"
            />
          </Nav.Item>
          <Nav.Link href="/dashboard" className="navBtn">
            <RiProfileLine size={50} />
            <p>Dashboard</p>
          </Nav.Link>
          <Nav.Link href="/alltransaction" className="navBtn">
            <AiOutlineTransaction size={50} />
            <p>Transactions</p>
          </Nav.Link>
          <Nav.Link href="/" className="navBtn">
            <MdOutlineAccountCircle size={50} />
            {/* <Image
            src="https://via.placeholder.com/50"
            alt="profile_image"
            roundedCircle
          /> */}
            <p>Account</p>
          </Nav.Link>
          <Nav.Link className="navBtn">
            <MdLogout size={50} />
            <p>Logout</p>
          </Nav.Link>
        </div>
      </div>
      <div
        className="nav-dropdown"
        style={menuOnClick ? { display: "block" } : { display: "none" }}
      >
        <Nav.Link href="/dashboard" className="navBtn">
          <RiProfileLine size={50} />
          <p>Dashboard</p>
        </Nav.Link>
        <Nav.Link href="/alltransaction" className="navBtn">
          <AiOutlineTransaction size={50} />
          <p>Transactions</p>
        </Nav.Link>
        <Nav.Link href="/" className="navBtn">
          <MdOutlineAccountCircle size={50} />
          {/* <Image
            src="https://via.placeholder.com/50"
            alt="profile_image"
            roundedCircle
          /> */}
          <p>Account</p>
        </Nav.Link>
        <Nav.Link className="navBtn" onClick={handleLogout}>
          <MdLogout size={50} />
          <p>Logout</p>
        </Nav.Link>
      </div>
    </Nav>
  );
}
