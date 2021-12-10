import React from "react";
import Navbar from "../navbar/Navbar";
import "./Wrapper.scss";
import { selectTheme } from "../themeChanger/themeChangerSlice";
import { useSelector } from "react-redux";

export default function Wrapper({ children }) {

  const theme = useSelector(selectTheme);

  return (
    <div className="wrapper">
      <Navbar />
      <div className={theme.mode === "dark" ? "main" : "main light"}>
        {children}
      </div>
    </div>
  );
}
