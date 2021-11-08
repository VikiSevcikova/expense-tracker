import React from 'react';
import "./Greeting.scss";

const Greeting = (userName) => {
  return (
    <h2 className="greeting">
      {`Welcome back ${userName} :)`}
    </h2>
  );
};

export default Greeting;
