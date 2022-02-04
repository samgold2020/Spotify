import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Colors } from '../../colors';
import SpinLoader from '../../components/SpinLoader/index';

const Artist = () => {
  const [artistData, setArtistData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    viewArtist(location.state.detail);
    // getArtistsDetails(location.state.detail);
  }, []);

  const viewArtist = async artistId => {
    const token = localStorage.getItem('Access_Token');

    try {
      let res = await axios({
        url: `https://api.spotify.com/v1/artists/${artistId}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log('SUCCESSFUL GET', res?.data);
        setArtistData(res?.data);
        setIsLoading(false);
      }
      // return artistData;
    } catch (err) {
      console.log('THIS IS THE ERROR');
    }
  };

  //TODO Capitalize each letter
  const displayGenre = () => {
    return artistData?.genres.toString().split(',').join(', ');
  };

  const artistName = location.state.name;

  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const url = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${artistName}`;

  const extractAPIContents = json => {
    const { pages } = json.query;
    return Object.keys(pages).map(id => pages[id].extract);
  };

  const getContents = async () => {
    let resp;
    let contents = [];
    setLoading(true);
    try {
      resp = await fetch(url);
      let json = await resp.json();
      contents = extractAPIContents(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
    setContents(contents);
  };

  useEffect(() => {
    getContents();
  }, []);

  return (
    <>
      <Container
        fluid
        style={{ backgroundColor: Colors.darkGrey, height: '100vh' }}
      >
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
              <Col sm={6} style={{ padding: '2rem', backgroundColor: 'blue' }}>
                <img
                  src={artistData?.images[1].url}
                  style={{
                    borderRadius: '15%',
                  }}
                  alt={`${artistData.name} profile art`}
                />
              </Col>
              <Col>
                <h1
                  style={{
                    fontSize: '5rem',
                    fontWeight: '700',
                    color: Colors.spotifyGreen,
                    textAlign: 'center',
                  }}
                >
                  {artistData?.name}
                </h1>

                <p style={{ color: Colors.white }}>{displayGenre()}</p>
              </Col>
            </Row>

            <Row
              style={{
                padding: '40px',
              }}
            >
              <Col
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: Colors.spotifyGreen,
                }}
              >
                <div>Playlist coming February 2021</div>
              </Col>
            </Row>
          </>
        )}
        <div
          style={{
            color: Colors.white,
          }}
        >
          {contents}
        </div>
      </Container>
    </>
  );
};

export default Artist;
