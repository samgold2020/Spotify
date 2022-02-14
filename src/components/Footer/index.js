import React from 'react';

import { Colors } from '../../colors';
//TODO Move Navbar out of components? Not sure where this should go but it's not a component

function Footer() {
  return (
    <div
      style={{
        backgroundColor: Colors.darkGrey,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ color: 'white' }}>Github</h1>
      <h1 style={{ color: 'white' }}>Portfolio</h1>
      <h1 style={{ color: 'white' }}>Email</h1>
    </div>
  );
}

export default Footer;
