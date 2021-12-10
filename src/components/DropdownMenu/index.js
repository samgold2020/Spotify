import React from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import Avatar from "react-avatar";

const UserDropdown = ({
  onClick,
  email,
  displayName,
  signout,
  style,
  ...rest
}) => (
  <Dropdown style={style}>
    <DropdownToggle
      variant="outline-secondary"
      className="btn-transparent avatar-toggle"
    >
      <Avatar name={email} size="35" round />
    </DropdownToggle>
    <Dropdown.Menu align={{ lg: "end" }} id="dropdown-menu-align-responsive-1">
      <Dropdown.Header>Signed in as: {email}</Dropdown.Header>
      <Dropdown.Header>{displayName}</Dropdown.Header>
      <Dropdown.Divider />
      <Dropdown.Item onClick={onClick}>{signout}</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default UserDropdown;
