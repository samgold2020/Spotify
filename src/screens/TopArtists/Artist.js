import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SpinLoader from '../../components/SpinLoader/index';
import styles from './styles';

const Artist = () => {
  const [artistData, setArtistData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [wickiContent, setWickiContent] = useState([]);

  const location = useLocation();

  const artistName = location.state.name;
  const url = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${artistName}`;

  useEffect(() => {
    viewArtist(location.state.detail);
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
    <div style={styles.pageBackground}>
      <Container fluid>
        {isLoading ? (
          <SpinLoader />
        ) : (
          <>
            <Row>
              <Col>
                <div style={{ ...styles.centerContent, ...styles.padding }}>
                  <img
                    src={artistData?.images[1].url}
                    style={styles.image}
                    alt={`${artistData?.name} profile art`}
                  />
                </div>
              </Col>
              <h1 style={styles.h1}>{artistData?.name}</h1>
              <p style={styles.p}>{displayGenre()}</p>
            </Row>

            <Row style={styles.padding}>
              <Col style={styles.paragraphBorder}>
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
