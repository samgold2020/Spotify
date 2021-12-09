import React from "react";

import Button from "react-bootstrap/Button";

import styles from "./styles";

const DisplayButton = ({ label, onClick, primary = false, style }) => (
  <>
    <Button
      style={styles.buttonPrimary(primary)}
      //   primary={primary}
      onClick={onClick}
    >
      {label}
    </Button>
  </>
);

export default DisplayButton;
