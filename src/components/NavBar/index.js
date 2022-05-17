import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import styles from './styles';
import UserDropdown from '../DropdownMenu';
import SpinLoader from '../SpinLoader';
import SpotifyLogo from './SpotifyLogo.png';
import { getCurrentUserData } from '../../queryHelper';
import useAuth from '../../hooks/useAuth';

function NavBar() {
  const { token } = useAuth();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isActiveRoute, setIsActiveRoute] = useState('');
  const [navOptions, setNavOptions] = useState([
    {
      pageTitle: 'Top Artists',
      href: '/topartists',
      isActiveRoute: false,
    },
    {
      pageTitle: 'Top Tracks',
      href: '/toptracks',
      isActiveRoute: false,
    },
    {
      pageTitle: 'History Upload',
      href: '/listeninghistory',
      isActiveRoute: false,
    },
  ]);

  /*
    signOut function clears local storage
    and redirects the user to the login page
  */
  function signOut() {
    localStorage.clear();
    window.location.href = 'http://localhost:3000/login';
  }

  useEffect(() => {
    if (token) {
      getUserData(token);
    } else {
      console.log('There is no token');
    }
  }, [token, isActiveRoute]);

  const getUserData = async token => {
    const res = await getCurrentUserData(token);
    if (res) {
      setUserData(res);
      setIsLoading(false);
    }
  };

  /*
  TODO:
    Find the index of the array object whose 
    isActiveRoute attribute needs to be flipped
  */
  // const handleClick = (currentPage, index) => {
  //   setNavOptions(
  //     navOptions.map(nav =>
  //       nav.pageTitle === currentPage ? { ...nav, isActiveRoute: true } : nav,
  //     ),
  //   );
  // };

  console.log('Nav Options', navOptions);
  return (
    <Navbar style={styles.navbar} expand="lg">
      <Container fluid>
        <Navbar.Brand href="/topartists">
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
            {navOptions.map((item, index) => (
              <Nav.Link
                key={index}
                style={styles.navbarLinks}
                href={item.href}
                // onClick={
                //   e => {
                //     e.preventDefault();
                //     handleClick(item.pageTitle, index);
                //   }
                // }
              >
                {item.pageTitle}
              </Nav.Link>
            ))}
          </Nav>
          {isLoading ? (
            <SpinLoader />
          ) : (
            <UserDropdown
              email={userData?.email}
              name={userData?.display_name}
              src={userData?.images[0].url}
              followers={userData?.followers?.total}
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
