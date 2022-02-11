import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { Colors } from '../../colors';
import TrackData from '../../components/TrackData';

function Track() {
  const [trackData, setTrackData] = useState('');
  const [percentData, setPercentData] = useState();

  const location = useLocation();

  useEffect(() => {
    viewTrack(location.state.detail);
    // getArtistsDetails(location.state.detail);
  }, []);

  const viewTrack = async trackId => {
    const token = localStorage.getItem('Access_Token');

    try {
      let res = await axios({
        url: `https://api.spotify.com/v1/audio-features/${trackId}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setTrackData(res?.data);
        console.log('response', res);
        // setIsLoading(false);
      }
      return trackData;
    } catch (err) {
      console.log('THIS IS THE ERROR');
    }
  };

  const decimalToPercentDisplay = () => {
    const dataToPercent = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'loudness',
      'speechiness',
      'valence',
    ];
    //TODO turn the decimal from the object
    Object.entries(trackData).map(([key, value]) => {
      if (dataToPercent.includes(key)) {
        console.log('KEY', key);
      }
    });
  };

  decimalToPercentDisplay();

  return (
    <>
      <Container
        fluid
        style={{ backgroundColor: Colors.darkGrey, height: '100vh' }}
      ></Container>
    </>
  );
}

export default Track;
