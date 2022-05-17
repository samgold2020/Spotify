import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

import SpinLoader from '../../components/SpinLoader/index';
import DisplayButton from '../../components/Button';
import styles from './styles';
import useAuth from '../../hooks/useAuth';
import uniformStyles from '../../constants/uniformstyles';
import { getTopArtists } from '../../queryHelper';

function TopArtists() {
  const { token } = useAuth();

  const [artistData, setArtistData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const history = useHistory();

  useEffect(() => {
    if (token) {
      getArtists(token);
    } else {
      console.log('No Token Top Artists');
    }
  }, [token]);

  const getArtists = async token => {
    const res = await getTopArtists(token);
    if (res) {
      setArtistData(res);
      setIsLoading(false);
    }
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleSubmit = artist => {
    history.push({
      pathname: '/viewartist',
      state: { detail: artist.id, name: artist.name },
    });
  };

  function openSpotify(hyperlink) {
    window.open(hyperlink);
  }

  return (
    <Container fluid style={uniformStyles.pageBackground}>
      {isLoading ? (
        <SpinLoader />
      ) : (
        <>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {artistData?.map((item, index) => (
              <Carousel.Item>
                <h1 key={index} style={uniformStyles.h1}>
                  <span>{`${index + 1}.`} </span> {item.name}
                </h1>
                <div
                  style={{
                    ...uniformStyles.centerContent,
                    ...uniformStyles.lightBackground,
                  }}
                >
                  <img
                    style={styles.carouselImage}
                    className="img-fluid"
                    src={item?.images[0].url}
                    alt={`${item.name} album art`}
                  />
                </div>
                <Carousel.Caption>
                  <div style={uniformStyles.centerContent}>
                    <DisplayButton
                      label={'Details'}
                      primary={false}
                      onClick={() => {
                        handleSubmit(item);
                      }}
                    />
                    <div style={{ marginLeft: '10px' }}>
                      <DisplayButton
                        label={'Spotify'}
                        primary={false}
                        onClick={() => {
                          openSpotify(item.external_urls.spotify);
                        }}
                      />
                    </div>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </Container>
  );
}

export default TopArtists;
