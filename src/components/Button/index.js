import React from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import styles from "./styles";

const DisplayButton = ({ label, onClick, primary = true, style }) => (
  <Col>
    {primary ? (
      <Button style={styles.buttonPrimary} onClick={onClick}>
        {label}
      </Button>
    ) : (
      <Button style={styles.secondaryButton} onClick={onClick}>
        {label}
      </Button>
    )}
  </Col>
);

export default DisplayButton;
