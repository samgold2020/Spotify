import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { RouteNav } from "./constants";
import Splash from "./screens/Splash/Splash";
import PrivateRoute from "./PrivateRoute";
import Home from "./screens/Home/Home";
import { AuthContext } from "./context/auth";

function App() {
  const getAuthParams = (hash) => {
    //hash is the URL (window.location.hash)?? Which is everything after the has "#"??
    //Return the string after index 1
    const stringAfterHash = hash.substring(1);
    //split on all &
    const paramsInUrl = stringAfterHash.split("&");
    //use Reduce LOOK UP
    const paramData = paramsInUrl.reduce((accumulator, currentValue) => {
      // console.log("Accumulator", accumulator, "currentValue", currentValue);
      const [key, value] = currentValue.split("=");
      //Accumulator is the empty object in the dependency array that we're adding to
      accumulator[key] = value;
      return accumulator;
    }, {});
    return paramData;
  };

  useEffect(() => {
    if (window.location.hash) {
      //destructure from return
      const { access_token, expires_in, token_type } = getAuthParams(
        window.location.hash
      );
      // localStorage.clear();
      localStorage.setItem("Access_Token", access_token);
      localStorage.setItem("Token_Type", token_type);
      localStorage.setItem("Expiers_In", expires_in);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path={RouteNav.Home} element={<Home />} />
        {/* <Route path={RouteNav.Splash} element={<Splash />} /> */}

        <Route
          path={RouteNav.Splash}
          element={
            <PrivateRoute>
              <Splash />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
