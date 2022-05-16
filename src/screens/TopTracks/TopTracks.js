import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Container from 'react-bootstrap/Container';

import SpinLoader from '../../components/SpinLoader';
import Table from './TopTracksTable';
import useAuth from '../../hooks/useAuth';
import uniformStyles from '../../constants/uniformstyles';

function TopTracks() {
  const { token } = useAuth();
  const [topSongs, setTopSongs] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getSongs(token);
    } else {
      console.log('No Token Top Tracks');
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
        setTopSongs(res.data);
        setIsLoading(false);
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  return (
    <Container fluid style={uniformStyles.pageBackground}>
      {isLoading ? <SpinLoader /> : <Table data={topSongs} />}
    </Container>
  );
}

export default TopTracks;
