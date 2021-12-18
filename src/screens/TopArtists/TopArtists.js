import React, { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'

import { Colors } from "../../colors";
import DisplayButton from "../../components/Button";
import SpinLoader from "../../components/SpinLoader/index";
import Button from 'react-bootstrap/Button'

function TopArtists({ data }) {
  const [token, setToken] = useState();
  const [artistData, setArtistData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [artistId, setArtistId] = useState("");
  const [index, setIndex] = useState(0);

  const history = useHistory();
  console.log("Artist data outside", artistData);

  useEffect(() => {
    const token = localStorage.getItem("Access_Token");
      getArtists(token);
  }, []);

  const getArtists = async (token) => {
    try {
      //Add users top tracks
      let res = await axios({
        url: "https://api.spotify.com/v1/me/top/artists",
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setArtistData(res?.data.items);
        console.log("Ari", artistData);
        setIsLoading(false);
      }
      return artistData;
    } catch (err) {
      console.log("THIS IS The ERROR");
    }
    return artistData;
  };
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

   const handleSubmit = (artistId) => {
      history.push({
          pathname: "/viewartist",
          state: { detail: artistId },
        });
   }

   function openSpotify(hyperlink){
    //  console.log(hyperlink)
    window.location.href = hyperlink
   }

  return (
    <div style={{backgroundColor: Colors.darkGrey, width: '100vw', height: '100vh'}}>
    {isLoading ? (
      <SpinLoader />
    ) : (
      <>
      <h1>Something here Centered and on the screen, talking about Top Artists:</h1>

      <Carousel activeIndex={index} onSelect={handleSelect} >
      {artistData?.map((item, index) => (
      <Carousel.Item>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <img  style={{maxHeight: '50%', height: '50%'}} src={item?.images[0].url} alt={`${item.name} album art`}/>
        </div>
        <Carousel.Caption>
          <h3 style={{color: Colors.spotifyGreen, fontSize: '32px', fontWeight: 700}}>{item.name}</h3>
          <div style={{paddingTop: '10px', display: 'flex', justifyContent:'center'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent:'center'}}>
        <Button 
        style={{backgroundColor: Colors.spotifyGreen, borderColor: Colors.spotifyGreen, color: Colors.white, marginRight: '20px'}} 
        variant="primary"
        onClick={() => {
          handleSubmit(item.id)
        }}
        >View Artist</Button>
        <Button  
        style={{backgroundColor: Colors.darkGrey, color: Colors.white}} 
        variant="outline-secondary"
        onClick={() => {
          openSpotify(item.external_urls.spotify)}
        }
        >Open in Spotify</Button>
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
