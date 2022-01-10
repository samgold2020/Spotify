import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Container from 'react-bootstrap/Container';
// import { useHistory } from "react-router-dom";

import { Colors } from '../../colors';
import SpinLoader from '../../components/SpinLoader';
import Table from './TopTracksTable';

function TopTracks() {
  const [topSongs, setTopSongs] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('Access_Token');
    if (token) {
      getSongs(token);
    } else {
      //No token
      console.log('No ToKen');
    }
  }, []);

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
    } catch (err) {
      console.log('THIS IS The ERROR');
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
