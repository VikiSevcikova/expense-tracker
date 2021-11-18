import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../features/userProfile/userSlice";
import Wrapper from "../features/wrapper/Wrapper";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  console.log("publicroute", user)

  if (user.isAuth) {
    return <Wrapper> {children} </Wrapper>;
  }
  return <Navigate to="/login"/>;
};

export default PrivateRoute;
