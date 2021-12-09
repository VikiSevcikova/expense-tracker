import React from 'react';
import {
  Form,
} from 'react-bootstrap';
import "./ThemeChanger.scss"
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from './themeChangerSlice';

const ThemeChanger = () => {

  //redux
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  //method
  const changeTheme = () => {
    theme.mode === "dark" ? dispatch(setTheme("light")) : dispatch(setTheme("dark"));
  };

  return (
    <>
      <Form className="themeChangeSwitch">
        <Form.Check
          type="switch"
          className="themeChanger"
          onChange={changeTheme}
        />
        <Form.Label>{theme.mode === "dark" ? "Dark" : "Light"}</Form.Label>
      </Form>
    </>
  );
};

export default ThemeChanger;
