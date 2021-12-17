import React from "react";

// import axios from "axios";
// import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";

// import UserDropdown from "../../components/DropdownMenu";
// import DisplayButton from "../../components/Button";
// import ContentCard from "../../components/Card";
// // import ModalConfirmation from "../../components/Modal";
// import styles from "./styles";
import { Colors } from "../../colors";

export default function Splash() {
  return (
    <>
      <div style={{ backgroundColor: Colors.darkGrey, minHeight: "100vh" }}>
        <Container>
          <h1 style={{ color: Colors.spotifyGreen }}>
            Welcome to Spotify Data!
          </h1>
          <p style={{ color: Colors.spotifyGreen }}>
            This page is currently under construciton (as of December 17, 2021). However, you can
            still view your top artists and tracks! 
          </p>
        </Container>
      </div>
    </>
  );
}
