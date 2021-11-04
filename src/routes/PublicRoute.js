import { Route, Redirect } from "react-router";

const PublicRoute = ({ children, ...rest }) => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  return (
    <Route
      {...rest}
      render={() =>
        !loggedInUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
