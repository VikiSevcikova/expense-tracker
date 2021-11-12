import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./utils/main.scss";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import AllTransaction from "./pages/allTransaction/AllTransaction";
import Account from "./pages/account/Account";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={"login"} element={<Auth />} />
            <Route path={"registration"} element={<Auth />} />
            <Route path={"forgot-password"} element={<Auth />} />
            <Route path={"reset-password/:token"} element={<Auth />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/alltransaction" element={<AllTransaction />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
