import React from 'react';

import { AiOutlineGithub, AiFillLinkedin } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { Colors } from '../../colors';
//TODO Move Navbar out of components? Not sure where this should go but it's not a component

function Footer() {
  const footerData = [
    {
      image: <AiOutlineGithub size={60} />,
      link: 'https://github.com/samgold2020',
    },
    {
      image: <AiFillLinkedin size={60} />,
      link: 'https://www.linkedin.com/in/sgoldstein312/',
    },
  ];
  return (
    <div
      style={{
        backgroundColor: Colors.lightGrey,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {footerData.map((item, index) => (
        <div
          key={index}
          style={{ color: Colors.white, margin: '10px', cursor: 'pointer' }}
          onClick={() => window.open(item.link)}
        >
          {item.image}
        </div>
      ))}
    </div>
  );
}

export default Footer;
