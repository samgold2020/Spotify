import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Colors } from '../../colors';
import SpinLoader from '../../components/SpinLoader';

function Track() {
  const [trackData, setTrackData] = useState('');
  const [percentData, setPercentData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [keySignature, setKeySignature] = useState();
  const [mode, setMode] = useState();

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
    return `${item} HELLO HELLOOOO`;
  };

  return (
    <div
      style={{
        backgroundColor: Colors.darkGrey,
        minHeight: '100vh',
      }}
    >
      <Container fluid>
        {isLoading ? (
          <SpinLoader />
        ) : (
          <>
            <Row>
              <Col
                style={{
                  paddingTop: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: Colors.spotifyGreen,
                }}
              >
                <img
                  style={{
                    borderRadius: '15px',
                    maxHeight: '350px',
                  }}
                  src={location.state.art}
                  alt={`${location.state.title} by ${location.state.artist}`}
                />
                <h1
                  style={{
                    color: Colors.spotifyGreen,
                    fontSize: '3rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    margin: '15px',
                  }}
                >
                  {`${location.state.title} - ${location.state.artist}`}
                </h1>
                <div
                  style={{
                    display: 'flex',
                    width: '25%',
                    justifyContent: 'space-evenly',
                    fontSize: '1em',
                    color: Colors.white,
                  }}
                >
                  <p>{`Key: ${keySignature} ${mode}`}</p>
                  <p>{`Duration: ${millisToMinutesAndSeconds(
                    trackData.duration_ms,
                  )}`}</p>
                  <p> {`Tempo: ${Math.round(trackData.tempo)} BPM`}</p>
                </div>
              </Col>
            </Row>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                overflow: 'scroll',
                backgroundColor: Colors.lightGrey,
                borderRadius: '15px',
                padding: '20px',
              }}
            >
              {percentData?.map(item => (
                <div
                  onClick={() => {
                    console.log('item that was clicked', item);
                    displaySongInformation(item);
                  }}
                  style={{
                    display: 'flex',
                    border: `3px solid ${Colors.spotifyGreen}`,
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '50%',
                    minWidth: '200px',
                    minHeight: '200px',
                    color: Colors.spotifyGreen,
                    backgroundColor: Colors.lightGrey,
                    fontSize: '1.5em',
                    justifyContent: 'center',
                    marginLeft: '20px',
                  }}
                >
                  {item[0]}
                  <span style={{ marginLeft: '10px' }}>{`${item[1]}%`}</span>
                </div>
              ))}
            </div>
            {/* TODO Add Song Player */}
            {displaySongInformation()}
            <Row>
              <Col
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '2%',
                  color: Colors.spotifyGreen,
                }}
              >
                <h1>PLAYER COMING SOON</h1>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default Track;
