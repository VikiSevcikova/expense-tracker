import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../userProfile/userSlice';
import "./Greeting.scss";

const Greeting = () => {
  const { userInfo } = useSelector(selectUser); 

  return (
    <h2 className="greeting">
      {`Welcome back ${userInfo.username} :)`}
    </h2>
  );
};

export default Greeting;
