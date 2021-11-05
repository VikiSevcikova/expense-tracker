import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Auth from "./pages/auth/Auth";
import Wrapper from "./features/wrapper/Wrapper";
import Dashboard from "./pages/dashboard/Dashboard";
import AllTransaction from "./pages/allTransaction/AllTransaction";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path={"login"} element={<Auth />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/alltransaction" element={<AllTransaction />} />
            </Route>


          </Routes>
      </Router>
    </div>
  );
};

export default App;
