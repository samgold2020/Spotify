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

  console.log('percent data', percentData);
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
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <h1
                  style={{
                    fontSize: '5rem',
                    fontWeight: '700',
                    color: Colors.spotifyGreen,
                  }}
                >
                  {location.state.title}
                </h1>
                <div
                  style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: Colors.spotifyGreen,
                  }}
                >
                  By
                </div>
                <div
                  style={{
                    fontSize: '4rem',
                    fontWeight: '700',
                    color: Colors.spotifyGreen,
                  }}
                >
                  {location.state.artist}
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  padding: '2rem',
                  borderRadius: '15px',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    border: `1px solid ${Colors.spotifyGreen}`,
                    padding: '10px',
                    borderRadius: '15px',
                    color: Colors.spotifyGreen,
                    backgroundColor: Colors.lightGrey,
                    fontSize: '3em',
                  }}
                >
                  {`Key: ${keySignature} ${mode}`}
                </div>
                <div
                  style={{
                    border: `1px solid ${Colors.spotifyGreen}`,
                    padding: '10px',
                    borderRadius: '15px',
                    color: Colors.spotifyGreen,
                    backgroundColor: Colors.lightGrey,
                    fontSize: '3em',
                  }}
                >
                  {`Tempo: ${trackData.tempo} BPM`}
                </div>
                <div
                  style={{
                    border: `1px solid ${Colors.spotifyGreen}`,
                    padding: '10px',
                    borderRadius: '15px',
                    color: Colors.spotifyGreen,
                    backgroundColor: Colors.lightGrey,
                    fontSize: '3em',
                  }}
                >
                  {`Duration: ${millisToMinutesAndSeconds(
                    trackData.duration_ms,
                  )}`}
                </div>
              </Col>
            </Row>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                overflow: 'scroll',
              }}
            >
              {percentData?.map(item => (
                <div
                  style={{
                    display: 'flex',
                    border: `3px solid ${Colors.spotifyGreen}`,
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px',
                    borderRadius: '50%',
                    minWidth: '200px',
                    minHeight: '200px',
                    color: Colors.spotifyGreen,
                    backgroundColor: Colors.lightGrey,
                    fontSize: '1.5em',
                    justifyContent: 'center',
                    marginTop: '5%',
                  }}
                >
                  {item[0]}
                  <span style={{ marginLeft: '10px' }}>{`${item[1]}%`}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Track;
