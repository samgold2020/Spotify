import React, { useState, useEffect } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";

import { Colors } from "../../colors";
import Card from "react-bootstrap/Card";

const Artist = () => {
  const [artistData, setArtistData] = useState();
  const location = useLocation();

  useEffect(() => {
    viewArtist(location.state.detail);
    // console.log(location.state.detail);
  }, []);

  //TODO Get Artist /v1/artists/id
  const viewArtist = async (artistId) => {
    const token = localStorage.getItem("Access_Token");

    try {
      let res = await axios({
        url: `https://api.spotify.com/v1/artists/${artistId}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log("SUCCESSFUL GET", res?.data);
        setArtistData(res?.data);
        //TODO reroute the user with the data to the new route
        // setUserData(res?.data);
      }
      //   return artistData;
    } catch (err) {
      console.log("THIS IS THE ERROR");
    }
  };

  //   //TODO get each
  //   const genres = artistData?.genres;
  //   const genreValues = Object.values(genres);
  //   console.log(genreValues);

  return (
    <>
      <div style={{ backgroundColor: Colors.darkGrey, minHeight: "100vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: Colors.spotifyGreen,
            padding: "20px",
          }}
        >
          <img
            src={artistData?.images[1].url}
            style={{ borderRadius: "50%", width: "25%", minWidth: "20%" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "5%",
            }}
          >
            <h1 style={{ fontSize: "80px", fontWeight: "700" }}>
              {artistData?.name}
            </h1>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            style={{
              width: "80%",
              borderColor: Colors.spotifyGreen,
              borderWidth: 2,
              backgroundColor: Colors.darkGrey,
              flexDirection: "row",
            }}
          >
            <p
              style={{
                color: Colors.spotifyGreen,
                width: "50%",
                fontSize: "36px",
                fontWeight: "500",
              }}
            >
              Total Followers: {artistData?.followers.total}
            </p>
            <p
              style={{
                color: Colors.spotifyGreen,
                width: "50%",
                fontSize: "36px",
                fontWeight: "500",
              }}
            >
              Popularity percentile: {artistData?.popularity}%
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Artist;
