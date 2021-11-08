import { Navigate, Outlet } from "react-router-dom";
import Wrapper from "../features/wrapper/Wrapper";

const PrivateRoute = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    return <Navigate to="/login"/>;
  }
  return <Wrapper> <Outlet /> </Wrapper>;
};

export default PrivateRoute;
