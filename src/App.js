import React from "react";
import {
  // BrowserRouter as Router,
  // Redirect,
  Routes,
  Route,
} from "react-router-dom";

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
