import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

import SpinLoader from '../../components/SpinLoader/index';
import DisplayButton from '../../components/Button';
import styles from './styles';

function TopArtists() {
  const token = localStorage.getItem('Access_Token');
  const [artistData, setArtistData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const history = useHistory();

  useEffect(() => {
    if (token) {
      getArtists(token);
    } else {
      console.log('There is no token');
    }
  }, [token]);

  const getArtists = async token => {
    try {
      let res = await axios({
        url: 'https://api.spotify.com/v1/me/top/artists',
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setArtistData(res?.data.items);
        setIsLoading(false);
      }
      return artistData;
    } catch (err) {
      console.log('Top Artists Error', err);
    }
    return artistData;
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
    <div style={styles.pageBackground}>
      {isLoading ? (
        <SpinLoader />
      ) : (
        <>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {artistData?.map((item, index) => (
              <Carousel.Item>
                <h1 key={index} style={styles.h1}>
                  <span>{`${index + 1}.`} </span> {item.name}
                </h1>
                <div
                  style={{
                    ...styles.centerContent,
                    ...styles.lightBackground,
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
                  <div style={styles.centerContent}>
                    <DisplayButton
                      label={'Artist Details'}
                      primary={false}
                      onClick={() => {
                        handleSubmit(item);
                      }}
                    />
                    <div style={{ marginLeft: '10px' }}>
                      <DisplayButton
                        label={'Open in Spotify'}
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
    </div>
  );
}

export default TopArtists;
