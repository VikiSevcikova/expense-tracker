import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../userProfile/userSlice';
import "./Greeting.scss";

const Greeting = () => {
  const { user } = useSelector(selectUser); 

  return (
    <h2 className="greeting">
      {`Welcome back ${user?.username} :)`}
    </h2>
  );
};

export default Greeting;
