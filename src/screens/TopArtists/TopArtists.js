import React, { useState, useEffect } from "react";

import axios from "axios";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";

import { Colors } from "../../colors";
import ContentCard from "../../components/Card";

function TopArtists({ data }) {
  const [token, setToken] = useState();
  const [artistData, setArtistData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [artistId, setArtistId] = useState("");
  const [test, setTest] = useState({});

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
      let res = await axios({
        url: `https://api.spotify.com/v1/me/top/artists`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setArtistData(res?.data.items);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("THIS IS THE ERROR");
    }
  };

  //TODO Get Artist /v1/artists/id
  const viewArtist = async () => {
    console.log(typeof artistId);
    try {
      let res = await axios({
        url: `https://api.spotify.com/v1/artists/${artistId}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log("SUCCESSFUL GET", res);
        setTest(res);

        //TODO reroute the user with the data to the new route
        // setUserData(res?.data);
      }
    } catch (err) {
      console.log("THIS IS THE ERROR");
    }
    // history.push("/viewartist", [test]);
  };

  return (
    <>
      <div style={{ backgroundColor: Colors.darkGrey, minHeight: "100vh" }}>
        <Container>
          {isLoading ? (
            <h1> ...Loading, please hold</h1>
          ) : (
            <Row className="justify-content-md-center">
              {artistData?.map((item, index) => (
                <ContentCard
                  key={index}
                  title={item?.name}
                  body={"Something fun"}
                  footerText={`Popularity on Spotify: ${item.popularity}`}
                  onClick={() => {
                    // setArtistId(item.id);
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
