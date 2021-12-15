import React, { useState, useEffect } from "react";

import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import styles from "./styles";
import UserDropdown from "../DropdownMenu";

function NavBar() {
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Getting here");
    if (localStorage.getItem("Access_Token")) {
      setToken(localStorage.getItem("Access_Token"));
      setIsLoading(false);
      if (token) {
        console.log("token", token);
        axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUserData(response?.data);
            console.log(response);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log("THIS IS THE ERROR", e);
            //TODO: Clear local storage if there is no token
            //localStorage.clear();
          });
      }
    } else {
      console.log("This will eventually be the logout");
    }
  }, []);

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
            email={userData?.email}
            displayName={userData?.display_name}
            signout={"Logout"}
            // onClick={signOut}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
