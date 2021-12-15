import React, { useState, useEffect } from "react";

import axios from "axios";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import UserDropdown from "../../components/DropdownMenu";
import DisplayButton from "../../components/Button";
import ContentCard from "../../components/Card";
// import ModalConfirmation from "../../components/Modal";
import styles from "./styles";
import { Colors } from "../../colors";

export default function Splash() {
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [searchType, setSearchType] = useState("artists");
  // const [topData, setTopData] = useState();
  // const [show, setShow] = useState(false);

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

  // const handleSearch = () => {
  //   axios
  //     .get(`https://api.spotify.com/v1/me/top/${searchType}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       // console.log("Top Response:", response.data);
  //       setTopData(response.data.items);
  //       console.log("Top Response:", topData);
  //     })
  //     .catch((e) => {
  //       console.log("Error", e);
  //       setShow(true);
  //     });
  // };

  //TODO Impliment the signout modal if user token expires
  // const signoutModal = () => {
  //   return (
  //     <>
  //       <ModalConfirmation
  //         title={"You are logged out"}
  //         body={
  //           "You have been logged out due to inactivity, please proceed to log back in."
  //         }
  //         buttonTitle={"Login"}
  //         onClick={() => console.log("Sign out modal")}
  //         isOpen={show}
  //       />
  //     </>
  //   );
  // };

  //TODO sign out and redirect
  const signOut = () => {
    console.log("Signout");
  };

  return (
    <>
      {/* <Navbar style={styles.navbar} expand="lg">
        <Container fluid>
          <Navbar.Brand style={styles.navbarTitle} href="#">
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
              <Nav.Link style={styles.navbarLinks} href="#action2">
                Top Tracks
              </Nav.Link>
            </Nav>
            <UserDropdown
              email={userData?.email}
              displayName={userData?.display_name}
              signout={"Logout"}
              onClick={signOut}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <div style={{ backgroundColor: Colors.darkGrey, minHeight: "100vh" }}>
        <Container>
          <h1>Hello</h1>
        </Container>
      </div>
    </>
  );
}
