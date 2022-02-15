import React from 'react';

import { AiOutlineGithub } from 'react-icons/ai';

import { Colors } from '../../colors';
//TODO Move Navbar out of components? Not sure where this should go but it's not a component

function Footer() {
  const footerData = [
    {
      image: <AiOutlineGithub />,
      link: 'https://github.com/samgold2020',
    },
    {
      image: 'Portfolio',
      link: 'Github',
    },
  ];
  return (
    <div
      style={{
        backgroundColor: Colors.darkGrey,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ color: 'white' }}>
        <AiOutlineGithub />
      </h1>
      <h1 style={{ color: 'white' }}>Portfolio</h1>
    </div>
  );
}

export default Footer;
