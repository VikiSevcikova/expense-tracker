import { Route, Redirect } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  return (
    <Route
      {...rest}
      render={() => (loggedInUser ? children : <Redirect to={"/login"} />)}
    />
  );
};

export default PrivateRoute;
