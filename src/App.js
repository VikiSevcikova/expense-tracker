import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import './App.scss';
import Auth from './pages/auth/Auth';

const App = () => {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/login" element={<Auth/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
