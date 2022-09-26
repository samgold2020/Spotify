import React from 'react';

import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SpinLoader from '../../components/SpinLoader/index';
import uniformStyles from '../../constants/uniformstyles';
import useWicki from '../../hooks/useWicki';

const Artist = () => {
  const location = useLocation();

  const artistName = location.state.name;
  const { wickiContent, isLoading } = useWicki(artistName);

  //TODO Capitalize each letter
  const displayGenre = () => {
    return location.state.genre.toString().split(',').join(', ');
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
                  src={location.state.image}
                  style={uniformStyles.image}
                  alt={`${location.state.name} profile art`}
                />
              </div>
            </Col>
            <h1 style={uniformStyles.h1}>{location.state.name}</h1>
            <p style={uniformStyles.p}>{displayGenre()}</p>
            <p
              style={uniformStyles.p}
            >{`Followers: ${location.state.followers}`}</p>
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
