import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../features/userProfile/userSlice";

const PublicRoute = ({ children }) => {
  const user = useSelector(selectUser);
  console.log("publicroute", user);

  if (user.isAuth) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PublicRoute;
