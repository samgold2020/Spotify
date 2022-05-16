import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import { Colors } from '../../colors';
import SpinLoader from '../../components/SpinLoader';
import styles from './styles';

function Track() {
  const [trackData, setTrackData] = useState('');
  const [percentData, setPercentData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [keySignature, setKeySignature] = useState();
  const [mode, setMode] = useState();
  const [buttonClick, setButtonClick] = useState(false);

  const location = useLocation();
  console.log('location', location);

  useEffect(() => {
    viewTrack(location.state.detail);
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
        setIsLoading(false);
        readableKeySignature(res.data.key);
        if (res?.data?.mode === 1) {
          setMode('Major');
        } else {
          setMode('Minor');
        }
      }
      return trackData;
    } catch (e) {
      console.log('Error getting the track', e);
    }
  };

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
        let percent = (value * 100).toFixed(0);
        return percentDataArr.push([key, percent]);
      }
    });
    setPercentData(percentDataArr);
  };

  const readableKeySignature = keyIndexSpotify => {
    const keyData = {
      0: 'C',
      1: 'C#/Db',
      2: 'D',
      3: 'D#/Eb',
      4: 'E',
      5: 'F',
      6: 'F#/Gb',
      7: 'G',
      8: 'G#/Ab',
      9: 'A',
      10: 'A#/Bb',
      11: 'B',
    };

    Object.entries(keyData).map(([k, v]) => {
      if (k === keyIndexSpotify.toString()) {
        return setKeySignature(v);
      } else if (keyIndexSpotify === -1) {
        return setKeySignature('No key signuatre detectable');
      }
    });
  };

  function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const displaySongInformation = item => {
    console.log('ITEM', item);
    // setButtonClick(true);
    // return `${item} HELLO HELLOOOO`;
  };

  return (
    <Container fluid style={styles.container}>
      {isLoading ? (
        <SpinLoader />
      ) : (
        <>
          <Row>
            <Col style={styles.centerImage}>
              <img
                style={styles.image}
                src={location.state.art}
                alt={`${location.state.title} by ${location.state.artist}`}
              />
              <h1 style={styles.h1}>
                {`${location.state.title} - ${location.state.artist}`}
              </h1>
              <p style={styles.p}>{`Key: ${keySignature} ${mode}`}</p>
              <p style={styles.p}>{`Duration: ${millisToMinutesAndSeconds(
                trackData.duration_ms,
              )}`}</p>
              <p style={styles.p}>
                {' '}
                {`Tempo: ${Math.round(trackData.tempo)} BPM`}
              </p>
            </Col>
          </Row>

          <Row style={{ backgroundColor: Colors.lightGrey, padding: '20px' }}>
            {percentData?.map(item => (
              <Col
                style={{
                  margin: '10px',
                }}
              >
                <ListGroup as="ul">
                  <ListGroup.Item
                    // active
                    as="li"
                    onClick={() => {
                      displaySongInformation(item);
                      setButtonClick(!buttonClick);
                    }}
                    style={{
                      backgroundColor: buttonClick
                        ? Colors.spotifyGreen
                        : Colors.lightGrey,
                      fontSize: '1.5em',
                      color: buttonClick ? Colors.white : Colors.spotifyGreen,
                      display: 'flex',
                      justifyContent: 'center',
                      border: `1px solid ${Colors.spotifyGreen}`,
                    }}
                  >
                    {item[0]}
                    <span style={{ marginLeft: '10px' }}>{`${item[1]}%`}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Track;
