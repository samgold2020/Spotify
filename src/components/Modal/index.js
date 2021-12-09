import React from "react";

import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ModalConfirmation = ({
  title,
  body,
  buttonTitle,
  onClick,
  isOpen = false,
}) => (
  <Modal show={isOpen}>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onClick}>
        {buttonTitle}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ModalConfirmation;
