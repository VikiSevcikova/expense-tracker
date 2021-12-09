import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./utils/main.scss";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import AllTransaction from "./pages/allTransaction/AllTransaction";
import Account from "./pages/account/Account";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { AlertMessage } from "./features/alertMessage/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./utils/utils";
import { removeUser, selectUser, setUser } from "./features/userProfile/userSlice";
import { hideAlert, showAlert } from "./features/alertMessage/alertMessageSlice";
import { getAll } from "./features/categoryIcon/categoryIconSlice";
import { selectTheme } from "./features/themeChanger/themeChangerSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  console.log("App,js", theme);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (token) {
          const { user } = await getUser(token);
          dispatch(setUser(user));
          dispatch(getAll(token));
        }
      } catch (error) {
        dispatch(removeUser());
        dispatch(
          showAlert({
            message: error && error.response && error.response.data
              ? error.response.data.error
              : "Sorry, there is an issues on the server.",
            variant: "danger",
          })
        );
        setTimeout(() => {
          dispatch(hideAlert());
        }, 5000);
      }
    };
    loadUser();
  }, [dispatch, token]);

  return (
    <div className={theme.mode === "dark" ? "App" : "App light"}>
      <Router>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } />
          <Route path="/registration" element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } />
          <Route path="/forgot-password" element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } />
          <Route path="/reset-password/:userId/:token" element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/alltransaction"
            element={
              <PrivateRoute>
                <AllTransaction />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <AlertMessage />
    </div>
  );
};

export default App;
