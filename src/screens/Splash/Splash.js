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
            Spotify measures your top tracks and artists based off something
            they call "Calculated Affinity". As defined by the documentation
            "Affinity is a measure of the expected preference a user has for a
            particular track or artist. It is based on user behavior, including
            play history, but does not include actions made while in incognito
            mode."
          </p>
          <p style={{ color: Colors.spotifyGreen }}>
            In other words, Calculated Affinity is your top played artists or
            tracks based on the artists or tracks you listen to the most when
            not using a Private Session
          </p>
        </Container>
      </div>
    </>
  );
}
