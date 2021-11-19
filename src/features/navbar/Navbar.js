import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import "./Navbar.scss";
import { RiProfileLine } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import axios from "axios";
import { hideAlert, showAlert } from "../alertMessage/alertMessageSlice";
import { removeUser } from "../userProfile/userSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOnClick, setMenuOnClick] = useState(false);

  const handleLogout = async () => {
    try{
      localStorage.removeItem("ET-token");
      const { data } = await axios.get("/auth/logout");
      dispatch(removeUser());
      dispatch(showAlert({
        message: data.message,
        variant: "info",
      }))
      navigate("/login");
    }catch(error){
      dispatch(
        showAlert({
          message: error.response.data.error
            ? error.response.data.error
            : "Sorry, there is an issues on the server.",
          variant: "danger",
        })
      );
      setTimeout(() => {
        dispatch(hideAlert());
      }, 5000);
    }
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
          <Link to="/" className="navBtn">
            <RiProfileLine size={50} />
          <p>Dashboard</p>
          </Link>
          <Link to="/alltransaction" className="navBtn">
            <AiOutlineTransaction size={50} />
            <p>Transactions</p>
          </Link>
          <Link to="/account" className="navBtn">
            <MdOutlineAccountCircle size={50} />
            {/* <Image
            src="https://via.placeholder.com/50"
            alt="profile_image"
            roundedCircle
          /> */}
            <p>Account</p>
          </Link>
          <Nav.Link className="navBtn" onClick={handleLogout}>
            <MdLogout size={50} />
            <p>Logout</p>
          </Nav.Link>
        </div>
      </div>
      <div
        className={menuOnClick ? "nav-dropdown__active" : "nav-dropdown"}

      // style={menuOnClick ? { display: "block" } : { display: "none" }}
      >
        <Nav.Link href="/" className="navBtn">
          <RiProfileLine size={50} />
          <p>Dashboard</p>
        </Nav.Link>
        <Nav.Link href="/alltransaction" className="navBtn">
          <AiOutlineTransaction size={50} />
          <p>Transactions</p>
        </Nav.Link>
        <Nav.Link href="/account" className="navBtn">
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
