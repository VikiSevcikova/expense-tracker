import React from 'react';

const Greeting = (userName) => {
  return (
    <div className="greeting">
      {`Welcome back ${userName} :)`}
    </div>
  );
};

export default Greeting;
