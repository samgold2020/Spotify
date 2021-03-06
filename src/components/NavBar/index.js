import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import styles from './styles';
import UserDropdown from '../DropdownMenu';
import SpinLoader from '../SpinLoader';
import SpotifyLogo from './SpotifyLogo.png';

//TODO Move Navbar out of components? Not sure where this should go but it's not a component

function NavBar() {
  const token = localStorage.getItem('Access_Token');
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function signOut() {
    //Clear out local storage and navigate back to login screen
    localStorage.clear();
    console.log(' logged out successfully' + window.status);
    window.location.href = 'http://localhost:3000/login';
  }

  useEffect(() => {
    if (token) {
      getUserData(token);
    } else {
      console.log('There is no token');
    }
  }, [token]);

  async function getUserData(token) {
    try {
      let res = await axios({
        url: 'https://api.spotify.com/v1/me',
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setUserData(res?.data);
        setIsLoading(false);
      }
      return userData;
    } catch (err) {
      console.log('Error', err);
    }
    return userData;
  }

  return (
    <Navbar style={styles.navbar} expand="lg">
      <Container fluid>
        <Navbar.Brand style={styles.navbarTitle} href="/topartists">
          <img
            style={{ width: '65px', height: '65px', marginLeft: '10px' }}
            src={SpotifyLogo}
            alt="Spotify Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={{ backgroundColor: 'white' }}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link style={styles.navbarLinks} href="/topartists">
              Top Artists
            </Nav.Link>
            <Nav.Link style={styles.navbarLinks} href="/toptracks">
              Top Tracks
            </Nav.Link>
          </Nav>
          {isLoading ? (
            <SpinLoader />
          ) : (
            <UserDropdown
              email={userData?.email}
              name={userData?.display_name}
              src={userData?.images[0].url}
              followers={userData?.followers.total}
              signout={'Logout'}
              onClick={signOut}
            />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
