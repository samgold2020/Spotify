import React, {useState, useEffect} from 'react';

import axios from "axios";
import { useLocation } from "react-router-dom";
import  Container  from 'react-bootstrap/Container';

import { Colors } from '../../colors';

function Track() {
    const [trackData, setTrackData] = useState();

    const location = useLocation();

    useEffect(() => {
        viewTrack(location.state.detail);
        // getArtistsDetails(location.state.detail);
      }, []);

    const viewTrack = async (trackId) => {
        const token = localStorage.getItem("Access_Token");
    
        try {
          let res = await axios({
            url: `https://api.spotify.com/v1/audio-features/${trackId}`,
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200) {
            console.log("SUCCESSFUL GET", res?.data);
            setTrackData(res?.data);
            // setIsLoading(false);
          }
            // return artistData;
        } catch (err) {
          console.log("THIS IS THE ERROR");
        }
      };

    return (
        <>
        <Container
        fluid
        style={{ backgroundColor: Colors.darkGrey, height: "100vh" }}
            >
            <h1>Track!</h1>
        </Container>
        </>
    );  
}

export default Track;