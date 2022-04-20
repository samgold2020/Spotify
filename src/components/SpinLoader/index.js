import React from "react";

import Spinner from "react-bootstrap/Spinner";

import { Colors } from "../../colors";

const SpinLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      <Spinner
        animation="border"
        size="lg"
        style={{
          color: Colors.spotifyGreen,
        }}
      />
    </div>
  );
};

export default SpinLoader;
