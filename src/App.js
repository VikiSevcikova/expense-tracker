import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Auth from "./pages/auth/Auth";
import Wrapper from "./features/wrapper/Wrapper";
import Dashboard from "./pages/dashboard/Dashboard";
import AllTransaction from "./pages/allTransaction/AllTransaction";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Wrapper>
          <Routes>
            <Route exact path="/login" element={<Auth />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/alltransaction" element={<AllTransaction />} />
          </Routes>
        </Wrapper>
      </Router>
    </div>
  );
};

export default App;
