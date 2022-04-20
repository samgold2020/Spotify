import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Container from 'react-bootstrap/Container';

import { Colors } from '../../colors';
import SpinLoader from '../../components/SpinLoader';
import Table from './TopTracksTable';

function TopTracks() {
  const token = localStorage.getItem('Access_Token');
  const [topSongs, setTopSongs] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getSongs(token);
    } else {
      console.log('There is no token');
    }
  }, [token]);

  const getSongs = async token => {
    try {
      let res = await axios({
        url: 'https://api.spotify.com/v1/me/top/tracks',
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log('Response', res.data);
        setTopSongs(res.data);
        setIsLoading(false);
      }
      return topSongs;
    } catch (e) {
      console.log('Error', e);
    }
  };

  return (
    <div style={{ backgroundColor: Colors.darkGrey, minHeight: '100vh' }}>
      <Container fluid>
        {isLoading ? <SpinLoader /> : <Table data={topSongs} />}
      </Container>
    </div>
  );
}

export default TopTracks;
