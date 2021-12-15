import React, { useState, useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import { RouteNav } from "./constants";
import Home from "./screens/Home/Home";
import Splash from "./screens/Splash/Splash";
import TopArtists from "./screens/TopArtists/TopArtists";
import NavBar from "./components/NavBar";
import Artist from "./screens/Artist/Artist";

function App() {
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();
  // const [isLoading, setIsLoading] = useState(true);

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
    setToken(localStorage.getItem("Access_Token"));
  }, []);

  useEffect(() => {
    if (token) {
      getUserData();
    }
    console.log("TOKEN", token);
  }, []);

  async function getUserData() {
    try {
      let res = await axios({
        url: "https://api.spotify.com/v1/me",
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log("SUCCESSFUL GET", res);
        setUserData(res?.data);
      }
      return userData;
    } catch (err) {
      console.log("THIS IS THE ERROR");
    }
  }

  return (
    <React.Fragment>
      <NavBar data={userData} />
      <Switch>
        <Route path={RouteNav.Home} component={Home} />
        <Route path={RouteNav.Splash} component={Splash} />
        <Route path={RouteNav.TopArtists} data={token} component={TopArtists} />
        <Route path={RouteNav.Artist} component={Artist} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
