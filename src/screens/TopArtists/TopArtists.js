import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

import { Colors } from '../../colors';
import SpinLoader from '../../components/SpinLoader/index';
import DisplayButton from '../../components/Button';

function TopArtists() {
  const token = localStorage.getItem('Access_Token');
  const [artistData, setArtistData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const history = useHistory();

  useEffect(() => {
    if (token) {
      getArtists(token);
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
    <div
      style={{
        backgroundColor: Colors.darkGrey,
        width: '100vw',
        height: '100vh',
      }}
    >
      {isLoading ? (
        <SpinLoader />
      ) : (
        <>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {artistData?.map((item, index) => (
              <Carousel.Item>
                <h1
                  style={{
                    color: Colors.spotifyGreen,
                    fontSize: '3rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    margin: '15px',
                  }}
                >
                  {item.name}
                </h1>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: Colors.lightGrey,
                  }}
                >
                  <img
                    style={{
                      borderRadius: '15px',
                      maxHeight: '600px',
                    }}
                    class="img-fluid"
                    src={item?.images[0].url}
                    alt={`${item.name} album art`}
                  />
                </div>
                <Carousel.Caption>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
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
