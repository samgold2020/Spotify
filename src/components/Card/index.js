import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const ContentCard = ({ title, src, body, onClick, footerText, style }) => (
  <Col>
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <Button onClick={onClick} variant="primary">
          {footerText}
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

export default ContentCard;
