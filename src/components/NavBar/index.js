import React, {useState, useEffect} from "react";

import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import styles from "./styles";
import UserDropdown from "../DropdownMenu";

function NavBar() {
  const [userData, setUserData] = useState();

  //TODO sign out and redirect
  const signOut = () => {
    // const url = "https://www.spotify.com/logout/";
    // window.open(url, "Spotify Logout", "width=700,height=500,top=40,left=40");
    // setTimeout(() => spotifyLogoutWindow.close(), 2000);
  };

  useEffect(() => {
    const token = localStorage.getItem("Access_Token");
    if (token){
      getUserData(token);
    } else {
      console.log("No Token")
    }
}, []);

async function getUserData(token) {
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
  return userData;
}

console.log("userData", userData)

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
            name={userData?.display_name}
            src={userData?.images[0].url}
            signout={"Logout"}
            // onClick={signOut}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
