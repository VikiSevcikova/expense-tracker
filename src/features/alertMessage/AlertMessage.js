import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectAlert,
} from './alertMessageSlice';
import Alert from 'react-bootstrap/Alert';
import './AlertMessage.scss';

export function AlertMessage() {
  const alert = useSelector(selectAlert);
console.log(alert)
  return (
    <Alert variant={alert.variant} show={alert.show} className="bottom-center">
        {alert.message}
    </Alert>
  );
}
