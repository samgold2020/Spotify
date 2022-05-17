import React from 'react';

import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { RouteNav } from './constants';
import Login from './screens/Login/Login';
import TopArtists from './screens/TopArtists/TopArtists';
import TopTracks from './screens/TopTracks/TopTracks';
import NavBar from './components/NavBar';
import Artist from './screens/TopArtists/Artist';
import Track from './screens/TopTracks/Track';
import Footer from './components/Footer';
import ListeningHistory from './screens/ListeningHistory/ListeningHistory';
import { Colors } from './colors';
import useAuth from './hooks/useAuth';

function App() {
  const { isAuth } = useAuth(window.location.hash);

  return (
    <React.Fragment>
      <Switch>
        <Route path={RouteNav.Login} component={Login} />
        {isAuth && (
          <div style={{ backgroundColor: Colors.darkGrey }}>
            <NavBar />
            <Route path={RouteNav.TopArtists} component={TopArtists} />
            <Route path={RouteNav.TopTracks} component={TopTracks} />
            <Route path={RouteNav.Artist} component={Artist} />
            <Route path={RouteNav.Track} component={Track} />
            <Route
              path={RouteNav.ListeningHistory}
              component={ListeningHistory}
            />
            <Footer />
          </div>
        )}
      </Switch>
    </React.Fragment>
  );
}

export default App;
