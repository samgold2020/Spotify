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
        console.log('res data', res.data);
        setTrackData(res.data);
        setIsLoading(false);
        manipulateData(res.data);
        setIsLoading(false);
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  minWidth: '60%',
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
                      <th>Percent</th>
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
                              backgroundColor: Colors.spotifyGreen,
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
