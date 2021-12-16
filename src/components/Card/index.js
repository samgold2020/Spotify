import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { Colors } from "../../colors";

const ContentCard = ({ title, src, body, onClick, footerText, style }) => (
  <Col>
    <Card
      style={{
        width: "15rem",
        height: "15rem",
        margin: "20px",
        backgroundColor: Colors.lightGrey,
      }}
    >
      <Card.Img
        variant="top"
        src={src}
        style={{
          width: "50%",
          borderRadius: "50%",
          padding: "10px",
          maxHeight: "50%",
        }}
      />
      <Card.Body>
        <Card.Title style={{ color: Colors.white, height: "40%" }}>
          {title}
        </Card.Title>
        <Card.Text style={style}>{body}</Card.Text>
        <Button
          onClick={onClick}
          style={{
            backgroundColor: Colors.spotifyGreen,
            borderColor: Colors.spotifyGreen,
          }}
          variant="primary"
        >
          {footerText}
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

export default ContentCard;
