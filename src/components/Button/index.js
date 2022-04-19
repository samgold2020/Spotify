import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import styles from './styles';

const DisplayButton = ({ label, onClick, primary = true, style }) => {
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  return (
    <>
      {primary ? (
        <Button
          onMouseEnter={() => setHoverPrimary(true)}
          onMouseLeave={() => setHoverPrimary(false)}
          style={styles.buttonPrimary(hoverPrimary)}
          onClick={onClick}
        >
          {label}
        </Button>
      ) : (
        <Button
          onMouseEnter={() => setHoverSecondary(true)}
          onMouseLeave={() => setHoverSecondary(false)}
          style={styles.buttonSecondary(hoverSecondary)}
          onClick={onClick}
        >
          {label}
        </Button>
      )}
    </>
  );
};

export default DisplayButton;
