import React from "react";

import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { RouteNav } from "./constants";
import Splash from "./screens/Splash/Splash";
import SignIn from "./screens/Authentication/SignIn";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={RouteNav.Splash} element={<Splash />} />
        <Route path={RouteNav.SignIn} element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
