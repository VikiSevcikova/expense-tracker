import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAlert, hideAlert } from "./alertMessageSlice";
import Alert from "react-bootstrap/Alert";
import "./AlertMessage.scss";

export function AlertMessage() {
  const dispatch = useDispatch();
  const alert = useSelector(selectAlert);
  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);
    }
  }, [alert]);
  return (
    <Alert variant={alert.variant} show={alert.show} className="bottom-center">
      {alert.message}
    </Alert>
  );
}
