import React, { useAuth, useState } from "react";

import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  //     const existingTokens = localStorage.getItem("Access_Token");
  //   const [authTokens, setAuthTokens] = useState(existingTokens);

  //   console.log("checking private route");
  //   console.log("ExistingToken?", existingTokens);

  //   const isAuthenticated = useAuth();
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/home" />;
}

export default PrivateRoute;
