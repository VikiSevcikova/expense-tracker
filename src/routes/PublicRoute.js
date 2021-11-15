import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    return <Navigate to="/" />;
  } else if (!loggedInUser) {
    <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PublicRoute;
