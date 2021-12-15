import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import styles from "./styles";
import UserDropdown from "../DropdownMenu";

function NavBar({ data }) {
  console.log("DATA inside nav", data);

  //TODO sign out and redirect
  const signOut = () => {
    // const url = "https://www.spotify.com/logout/";
    // window.open(url, "Spotify Logout", "width=700,height=500,top=40,left=40");
    // setTimeout(() => spotifyLogoutWindow.close(), 2000);
  };

  return (
    <Navbar style={styles.navbar} expand="lg">
      <Container fluid>
        <Navbar.Brand style={styles.navbarTitle} href="/splash">
          Spotify Data
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={{ backgroundColor: "white" }}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link style={styles.navbarLinks} href="/topartists">
              Top Artists
            </Nav.Link>
            <Nav.Link style={styles.navbarLinks} href="/toptracks">
              Top Tracks
            </Nav.Link>
          </Nav>
          <UserDropdown
            email={data?.email}
            displayName={data?.display_name}
            signout={"Logout"}
            // onClick={signOut}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
