import React, { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { RouteNav } from "./constants";
import Splash from "./screens/Splash/Splash";
import SignIn from "./screens/Authentication/SignIn";

const CLIENT_ID = "7e36f2d84e53488fb922004cd1a7456a";
const SPOTIFY_AUTHORIZE_BASEURL = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:3001/Splash";
const SCOPES = [`user-top-read, user-read-email`];
const SPACE_DELIMITER = "$20";
const SCOPE_SPACES_URL = SCOPES.join(SPACE_DELIMITER);

function App() {
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_BASEURL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE_SPACES_URL}&response_type=token&show_dialogue=true`;
  };
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
      localStorage.clear();
      localStorage.setItem("Access_Token", access_token);
      localStorage.setItem("Token_Type", token_type);
      localStorage.setItem("Expiers_In", expires_in);
      console.log(localStorage.getItem("Access_Token"));
    }
  });

  return (
    <div className="App">
      <button onClick={handleLogin}>Login</button>
      <Routes>
        <Route path={RouteNav.Splash} element={<Splash />} />
        {/* <Route path={RouteNav.SignIn} element={<SignIn />} /> */}
      </Routes>
    </div>
  );
}

export default App;
