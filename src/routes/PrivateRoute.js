import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../features/userProfile/userSlice";
import Wrapper from "../features/wrapper/Wrapper";

const PrivateRoute = () => {
  const {isAuth} = useSelector(selectUser);

  if (!isAuth) {
    return <Navigate to="/login"/>;
  }
  return <Wrapper> <Outlet /> </Wrapper>;
};

export default PrivateRoute;
