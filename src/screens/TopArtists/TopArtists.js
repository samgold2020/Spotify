import React, { useState, useEffect } from "react";

import axios from "axios";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";

import { Colors } from "../../colors";
import ContentCard from "../../components/Card";
import SpinLoader from "../../components/SpinLoader/index";

function TopArtists({ data }) {
  const [token, setToken] = useState();
  const [artistData, setArtistData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [artistId, setArtistId] = useState("");

  const history = useHistory();
  console.log("Artist data outside", artistData);

  useEffect(() => {
    const token = localStorage.getItem("Access_Token");
    if (token) {
      getArtists(token);
    } else {
      //No token
      console.log("No ToKen");
    }
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
    console.log("res", artistData);
  };

  return (
    <>
      <div style={{ backgroundColor: Colors.darkGrey, minHeight: "100vh" }}>
        <Container>
          {isLoading ? (
            <SpinLoader />
          ) : (
            <Row className="justify-content-md-center">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 style={{ color: Colors.spotifyGreen, paddingTop: "20px" }}>
                  These are your top artists based on calculated affinity:
                </h1>
              </div>
              {artistData?.map((item, index) => (
                <ContentCard
                  key={index}
                  title={item?.name}
                  src={item.images[0].url}
                  footerText={"View Artist Details"}
                  onClick={() => {
                    history.push({
                      pathname: "/viewartist",
                      state: { detail: item.id },
                    });
                  }}
                />
              ))}
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}

export default TopArtists;
