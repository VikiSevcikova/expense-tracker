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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showAlert } from "../alertMessage/alertMessageSlice";
import { removeUser, selectUser } from "../userProfile/userSlice";

export default function Navbar() {
  //router
  const navigate = useNavigate();
  //redux
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const [menuOnClick, setMenuOnClick] = useState(false);

  const handleLogout = async () => {
    try{
      dispatch(removeUser());
      dispatch(showAlert({
        message: "You were successfully logged out.",
        variant: "info",
      }))
      navigate("/login");
    }catch(error){
      dispatch(
        showAlert({
          message: error.response.data.error
            ? error.response.data.error
            : "Sorry, something went wrong on the server side",
          variant: "danger",
        })
      );
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
            {/* {
              user?.avatar ? 
                <Image
                src={user.avatar}
                alt="profile_image"
                className="avatar"
                roundedCircle
              />
              : */}
                <MdOutlineAccountCircle size={50} />
            {/* } */}
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
          {
              user?.avatar ? 
                <Image
                src={user.avatar}
                alt="profile_image"
                className="avatar"
                roundedCircle
              />
              :
                <MdOutlineAccountCircle size={50} />
            }
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
