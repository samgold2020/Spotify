import React, { useState, useEffect } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import * as V from "victory";
import { VictoryPie, VictoryLabel } from "victory";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Colors } from "../../colors";
import SpinLoader from "../../components/SpinLoader/index";
import DisplayButton from '../../components/Button';

const Artist = () => {
  const [artistData, setArtistData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    viewArtist(location.state.detail);
    // getArtistsDetails(location.state.detail);
  }, []);

  //   GET artists Details
  //   const getArtistsDetails = async (artistId) => {
  //     let endpoints = [
  //       `https://api.spotify.com/v1/artists/${artistId}`,
  //       `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
  //     ];
  //     await axios
  //       .all(endpoints.map((endpoint) => axios.get(endpoint)))
  //       .then((data) => console.log(data));
  //   };

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
        setIsLoading(false);
      }
        // return artistData;
    } catch (err) {
      console.log("THIS IS THE ERROR");
    }
  };

  //TODO Capitalize each letter
  const displayGenre = () => {
    return artistData?.genres.toString().split(",").join(", ");
  };

  const remainder = 100 - artistData?.popularity;

  return (
    <>
      <Container
        fluid
        style={{ backgroundColor: Colors.darkGrey, height: "100vh" }}
      >
        {isLoading ? (
          <SpinLoader />
        ) : (
          <>
            <Row
              style={{
                paddingTop: "40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Col style={{ paddingLeft: "40px" }}>
                <img
                  src={artistData?.images[1].url}
                  style={{
                    borderRadius: "15%",
                  }}
                />
              </Col>
              <Col lg={8}>
                <h1
                  style={{
                    fontSize: "80px",
                    fontWeight: "700",
                    marginLeft: "40px",
                    color: Colors.spotifyGreen,
                  }}
                >
                  {artistData?.name}
                </h1>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: "40px",
                  }}
                >
                  <p style={{color: Colors.white }}>{displayGenre()}</p>
                </div>
              </Col>
            </Row>

            <Row style={{ padding: "40px" }}>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",

                }}
              >
              </Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "blue",
                }}
              >
                <Card
                  style={{
                    width: "50%",
                    borderColor: Colors.spotifyGreen,
                    borderWidth: 2,
                    backgroundColor: Colors.darkGrey,
                    borderRadius: "15px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Card.Title
                      style={{
                        color: Colors.spotifyGreen,
                        fontSize: "36px",
                        fontWeight: "500",
                      }}
                    >
                      Popularity
                    </Card.Title>
                  </div>

                  <svg viewBox="0 0 400 400">
                    <VictoryPie
                      standalone={false}
                      width={400}
                      height={400}
                      data={[
                        { x: "Artist", y: artistData?.popularity },
                        { x: `${remainder}%`, y: remainder },
                      ]}
                      innerRadius={70}
                      labelRadius={100}
                      style={{
                        labels: {
                          fontSize: 20,
                          fill: Colors.white,
                        },
                      }}
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="65"
                      fill={Colors.darkGrey}
                      stroke={Colors.white}
                      strokeWidth={3}
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="155"
                      fill="none"
                      stroke={Colors.white}
                      strokeWidth={3}
                    />
                    <VictoryLabel
                      textAnchor="middle"
                      verticalAnchor="middle"
                      x={200}
                      y={200}
                      style={{ fontSize: "30px" }}
                      text={`${artistData?.popularity}%`}
                    />
                  </svg>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Artist;
