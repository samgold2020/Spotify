import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';

import SpinLoader from '../../components/SpinLoader';
import Table from './TopTracksTable';
import useAuth from '../../hooks/useAuth';
import uniformStyles from '../../constants/uniformstyles';
import { getTopTracks } from '../../queryHelper';

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
    const res = await getTopTracks(token);
    if (res) {
      setTopSongs(res);
      setIsLoading(false);
    }
  };

  return (
    <Container fluid style={uniformStyles.pageBackground}>
      {isLoading ? <SpinLoader /> : <Table data={topSongs} />}
    </Container>
  );
}

export default TopTracks;
