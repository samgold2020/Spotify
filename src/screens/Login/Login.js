import React from 'react';

import Container from 'react-bootstrap/Container';
import 'animate.css';

import { Colors } from '../../colors';
import DisplayButton from '../../components/Button/index';

export default function Login() {
  const CLIENT_ID = '7e36f2d84e53488fb922004cd1a7456a';
  const SPOTIFY_AUTHORIZE_BASEURL = 'https://accounts.spotify.com/authorize';
  const REDIRECT_URI = 'http://localhost:3000/topartists';
  const SCOPES = [`user-top-read, user-read-email`];
  const SPACE_DELIMITER = '$20';
  const SCOPE_SPACES_URL = SCOPES.join(SPACE_DELIMITER);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_BASEURL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE_SPACES_URL}&response_type=token&show_dialogue=true`;
  };

  return (
    <div style={{ backgroundColor: Colors.darkGrey, minHeight: '100vh' }}>
      <Container fluid>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: '25%',
            textAlign: 'center',
          }}
        >
          <h1
            class="animate__animated animate__bounce"
            style={{ fontSize: '4rem', color: Colors.spotifyGreen }}
          >
            Spotify Tops
          </h1>
          <h2 style={{ fontSize: '1.5rem', color: Colors.spotifyGreen }}>
            Explore your favorite songs and artists
          </h2>
          <DisplayButton
            label={'Login'}
            onClick={handleLogin}
            primary={false}
          />
        </div>
      </Container>
    </div>
  );
}
