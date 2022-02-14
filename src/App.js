import React, { useState, useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { RouteNav } from './constants';
import Login from './screens/Login/Login';
import TopArtists from './screens/TopArtists/TopArtists';
import TopTracks from './screens/TopTracks/TopTracks';
import NavBar from './components/NavBar';
//TODO move to other folder for topArtists
import Artist from './screens/TopArtists/Artist';
import Track from './screens/TopTracks/Track';
//TODO MAKE A FOOTER WITH GITHUB AND LINKEDIN

function App() {
  const [token, setToken] = useState();

  const getAuthParams = hash => {
    //hash is the URL (window.location.hash)?? Which is everything after the has "#"??
    //Return the string after index 1
    const stringAfterHash = hash.substring(1);
    //split on all &
    const paramsInUrl = stringAfterHash.split('&');
    //use Reduce LOOK UP
    const paramData = paramsInUrl.reduce((accumulator, currentValue) => {
      // console.log("Accumulator", accumulator, "currentValue", currentValue);
      const [key, value] = currentValue.split('=');
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
        window.location.hash,
      );
      // localStorage.clear();
      localStorage.setItem('Access_Token', access_token);
      localStorage.setItem('Token_Type', token_type);
      localStorage.setItem('Expiers_In', expires_in);
    }
    setToken(localStorage.getItem('Access_Token'));
  }, []);

  console.log('is there a token', !token);

  return (
    <React.Fragment>
      <Switch>
        <Route path={RouteNav.Login} component={Login} />
        <div>
          <NavBar />
          <Route
            path={RouteNav.TopArtists}
            data={token}
            component={TopArtists}
          />
          <Route path={RouteNav.TopTracks} data={token} component={TopTracks} />
          <Route path={RouteNav.Artist} component={Artist} />
          <Route path={RouteNav.Track} component={Track} />
        </div>
      </Switch>
    </React.Fragment>
  );
}

export default App;
