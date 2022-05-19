import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SpinLoader from '../../components/SpinLoader/index';
import uniformStyles from '../../constants/uniformstyles';
import useWicki from '../../hooks/useWicki';
import useAuth from '../../hooks/useAuth';
import { getArtistByName } from '../../queryHelper';

const Artist = () => {
  const [artistData, setArtistData] = useState();

  const location = useLocation();

  const artistName = location.state.name;
  const { wickiContent, isLoading } = useWicki(artistName);
  const { token } = useAuth();

  useEffect(() => {
    viewArtist(location.state.detail);
  }, [token]);

  const viewArtist = async artistId => {
    const res = await getArtistByName(artistId, token);
    setArtistData(res);
  };

  //TODO Capitalize each letter
  const displayGenre = () => {
    return artistData?.genres.toString().split(',').join(', ');
  };

  return (
    <Container fluid style={uniformStyles.pageBackground}>
      {isLoading ? (
        <SpinLoader />
      ) : (
        <>
          <Row>
            <Col>
              <div
                style={{
                  ...uniformStyles.centerContent,
                  ...uniformStyles.padding,
                }}
              >
                <img
                  src={artistData?.images[1].url}
                  style={uniformStyles.image}
                  alt={`${artistData?.name} profile art`}
                />
              </div>
            </Col>
            <h1 style={uniformStyles.h1}>{artistData?.name}</h1>
            <p style={uniformStyles.p}>{displayGenre()}</p>
            <p
              style={uniformStyles.p}
            >{`Followers: ${artistData?.followers.total}`}</p>
          </Row>

          <Row style={uniformStyles.padding}>
            <Col
              style={{ ...uniformStyles.paragraphBorder, ...uniformStyles.p }}
            >
              {wickiContent}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Artist;
