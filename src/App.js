import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Auth from "./pages/auth/Auth";
import Navbar from "./features/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Auth />} />
          <Navbar>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Navbar>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
