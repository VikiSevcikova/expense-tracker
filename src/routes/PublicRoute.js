import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    return <Navigate to="/dashboard"/>;
  }
  return <Outlet />;
};

export default PublicRoute;
