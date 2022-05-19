import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import Avatar from 'react-avatar';

import { Colors } from '../../colors';

const UserDropdown = ({
  onClick,
  email,
  signout,
  style,
  src,
  name,
  followers,
  ...rest
}) => (
  <Dropdown
    style={{ fontFamily: 'Montserrat', fontWeight: '700', fontSize: '1.2em' }}
  >
    <DropdownToggle
      variant="outline-secondary"
      className="btn-transparent avatar-toggle"
      style={{ color: Colors.white }}
    >
      <Avatar style={{ marginRight: '10px' }} src={src} size="35" round />
      {name}
    </DropdownToggle>
    <Dropdown.Menu align={{ lg: 'end' }} id="dropdown-menu-align-responsive-1">
      <Dropdown.Header>Signed in as: {email}</Dropdown.Header>
      <Dropdown.Header>Total Followers: {followers}</Dropdown.Header>
      <Dropdown.Divider />
      <Dropdown.Item onClick={onClick}>{signout}</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default UserDropdown;
