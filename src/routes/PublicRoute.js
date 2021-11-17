import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../features/userProfile/userSlice";

const PublicRoute = () => {
  const {isAuth} = useSelector(selectUser);

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PublicRoute;
