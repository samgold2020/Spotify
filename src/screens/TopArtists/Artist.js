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
  const [wickiContent, setWickiContent] = useState([]);

  const location = useLocation();

  const artistName = location.state.name;
  const url = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${artistName}`;

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
        // console.log('SUCCESSFUL GET', res?.data);
        setArtistData(res?.data);
        setIsLoading(false);
      }
      // return artistData;
    } catch (e) {
      console.log('Error', e);
    }
  };

  //TODO Capitalize each letter
  const displayGenre = () => {
    return artistData?.genres.toString().split(',').join(', ');
  };

  const getWickiArtistContent = async () => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { pages } = data.query;
        setWickiContent(Object.keys(pages).map(id => pages[id].extract));
        setIsLoading(false);
      })
      .catch(e => console.log(e));
  };
  console.log('content from Wicik', wickiContent.length);

  useEffect(() => {
    getWickiArtistContent();
  }, []);

  return (
    <div style={{ backgroundColor: Colors.darkGrey, minHeight: '100vh' }}>
      <Container fluid>
        {isLoading ? (
          <SpinLoader />
        ) : (
          <>
            <Row>
              <Col>
                <div>
                  <div
                    style={{
                      padding: '2rem',
                      borderRadius: '15px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={artistData?.images[1].url}
                      style={{
                        borderRadius: '15%',
                      }}
                      alt={`${artistData.name} profile art`}
                    />
                  </div>
                </div>
              </Col>
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

              <p style={{ color: Colors.white, textAlign: 'center' }}>
                {displayGenre()}
              </p>
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
                  border: `1px solid ${Colors.spotifyGreen}`,
                  color: Colors.white,
                  padding: '40px',
                  fontSize: '1.5rem',
                  borderRadius: '15px',
                }}
              >
                <div>{wickiContent}</div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Artist;
