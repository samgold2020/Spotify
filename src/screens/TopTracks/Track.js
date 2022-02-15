import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Colors } from '../../colors';
import TrackData from '../../components/TrackData';
import SpinLoader from '../../components/SpinLoader';

function Track() {
  const [trackData, setTrackData] = useState('');
  const [percentData, setPercentData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        setTrackData(res.data);
        setIsLoading(false);
        manipulateData(res.data);
        // console.log('response', res);
        // Object.entries(trackData)?.map(([key, value]) => {
        //   console.log('key', key, value);
        //   if (dataToPercent.includes(key)) {
        //     // let percent = value * 100;
        //     setPercentData([key, value]);
        //   }
        // });
        setIsLoading(false);
      }
      return trackData;
    } catch (err) {
      console.log('THIS IS THE ERROR');
    }
  };

  //Turn trackData into what I want it to be before sending it down

  const manipulateData = trackData => {
    let percentDataArr = [];

    const displayPercentData = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness',
      'valence',
    ];

    Object.entries(trackData)?.map(([key, value]) => {
      if (displayPercentData?.includes(key)) {
        let percent = value * 100;
        percentDataArr.push([key, percent]);
      }
    });
    setPercentData(percentDataArr);
  };

  console.log('yo', percentData);

  return (
    <div style={{ backgroundColor: Colors.darkGrey, minHeight: '100vh' }}>
      <Container fluid>
        {isLoading ? (
          <SpinLoader />
        ) : (
          <>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Col
                style={{
                  padding: '2rem',
                  borderRadius: '15px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <h1
                  style={{
                    fontSize: '5rem',
                    fontWeight: '700',
                    color: Colors.spotifyGreen,
                    textAlign: 'center',
                  }}
                >
                  {location.state.title}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* //Return a function??? */}
                {/* <div style={{ display: 'flex' }}> */}
                {/* {Object.entries(trackData)?.map(([key, value]) => (
                    <TrackData title={key} text={key} value={value} />
                  ))} */}
                {percentData?.map(item => (
                  <TrackData title={item[0]} text={item[0]} value={item[1]} />
                  // <div
                  //   style={{
                  //     color: 'white',
                  //     backgroundColor: 'blue',
                  //     width: '100%',
                  //   }}
                  // >
                  //   {item}
                  // </div>
                ))}
                {/* </div> */}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default Track;
