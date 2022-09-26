import axios from 'axios';

const endpoint = process.env.REACT_APP_BASEURL;

/* Not currently in use but saved for later use */
// export const getArtistByName = async (artistId, token) => {
//   if (token) {
//     try {
//       let res = await axios({
//         url: `${endpoint}artists/${artistId}`,
//         method: 'get',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.status === 200) {
//         return res?.data;
//       }
//     } catch (e) {
//       console.log('Error', e);
//     }
//   }
// };

export const getTopArtists = async token => {
  if (token) {
    try {
      let res = await axios({
        url: `${endpoint}me/top/artists`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        return res?.data.items;
      }
    } catch (e) {
      console.log('Error', e);
    }
  }
};

export const getTrackAudioFeatures = async (trackId, token) => {
  if (token) {
    try {
      let res = await axios({
        url: `${endpoint}audio-features/${trackId}`,
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
  }
};

export const getTopTracks = async token => {
  if (token) {
    try {
      let res = await axios({
        url: `${endpoint}me/top/tracks`,
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
  }
};

export const getCurrentUserData = async token => {
  if (token) {
    try {
      let res = await axios({
        url: `${endpoint}me`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        return res?.data;
      }
    } catch (e) {
      // signOut();
      console.log('Error', e);
    }
  }
};
