import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated(false)) {
          return <Component {...props} />;
        } else {
            alert("You Don't Have Access to This Page")
          return (
            <Redirect
              to={{
                pathname: "/alogin",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute
