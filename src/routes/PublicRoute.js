import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../features/userProfile/userSlice";

const PublicRoute = ({children}) => {
  const user = useSelector(selectUser);
  
  if (user.isAuth) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PublicRoute;
