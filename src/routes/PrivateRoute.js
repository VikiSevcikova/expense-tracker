import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../features/spinner/LoadingSpinner";
import { selectUser } from "../features/userProfile/userSlice";
import Wrapper from "../features/wrapper/Wrapper";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  console.log("privateroute", user)

  if (user.isAuth) {
    if(!user.user) return <Wrapper> <LoadingSpinner/> </Wrapper>;

    return <Wrapper> {children} </Wrapper>;
  }
  return <Navigate to="/login"/>;
};

export default PrivateRoute;
