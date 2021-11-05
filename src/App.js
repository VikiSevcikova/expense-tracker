import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Auth from './pages/auth/Auth';
import AllTransaction from './pages/allTransaction/AllTransaction';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Auth />} />
          <Route exact path="/alltransaction" element={<AllTransaction />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
