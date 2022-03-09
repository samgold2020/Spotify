import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';

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
      console.log('Song data', res);
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
        let percent = (value * 100).toFixed(2);
        percentDataArr.push([key, percent]);
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
        setKeySignature(v);
      } else if (keyIndexSpotify === -1) {
        setKeySignature('No key signuatre detectable');
      }
    });
  };

  function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

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
                {/* //TODO Round up so no decimal */}
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
                // justifyContent: 'center',
                marginLeft: '5%',
              }}
            >
              <div
                style={{
                  minWidth: '40%',
                }}
              >
                <Table
                  striped
                  hover
                  responsive="sm"
                  variant="dark"
                  bordered={false}
                >
                  <thead>
                    <tr style={{ color: Colors.white }}>
                      <th>Category</th>
                      <th>Percent %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {percentData?.map(item => (
                      <tr
                        style={{
                          color: Colors.white,
                          fontSize: '1.5em',
                        }}
                      >
                        <td
                          style={{
                            alignItems: 'center',
                          }}
                        >
                          {item[0]}
                        </td>
                        <td style={{ width: '100%', height: '70px' }}>
                          <ProgressBar
                            striped
                            animated
                            now={item[1]}
                            label={`${item[1]}%`}
                            style={{
                              height: '50px',
                              fontSize: '1em',
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Track;
