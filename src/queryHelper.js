import axios from 'axios';

export const getArtistByName = async (artistId, token) => {
  console.log('Artist by name', artistId, token);
  try {
    let res = await axios({
      url: `https://api.spotify.com/v1/artists/${artistId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res?.data;
    }
  } catch (e) {
    console.log('Error', e);
  }
};

export const getTopArtists = async token => {
  try {
    let res = await axios({
      url: 'https://api.spotify.com/v1/me/top/artists',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res?.data.items;
    }
  } catch (err) {
    console.log('Top Artists Error', err);
  }
};

export const getTrackAudioFeatures = async (trackId, token) => {
  try {
    let res = await axios({
      url: `https://api.spotify.com/v1/audio-features/${trackId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.log('Error getting the track', e);
  }
};

export const getTopTracks = async token => {
  try {
    let res = await axios({
      url: 'https://api.spotify.com/v1/me/top/tracks',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.log('Error', e);
  }
};
