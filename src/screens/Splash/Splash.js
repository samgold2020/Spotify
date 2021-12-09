import React, { useState, useEffect } from "react";

import axios from "axios";

import UserDropdown from "../../components/DropdownMenu";
import DisplayButton from "../../components/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function Splash() {
  const [token, setToken] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchType, setSearchType] = useState("artists");

  useEffect(() => {
    if (localStorage.getItem("Access_Token")) {
      setToken(localStorage.getItem("Access_Token"));
      console.log("TOKEN", token);
      setIsLoading(false);
      if (token) {
        axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("Response:", response.data);
            setData(response?.data);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log("THIS IS THE ERROR", e);
            localStorage.clear();
          });
      }
    }
  }, [token]);

  const handleSearch = () => {
    axios
      .get(`https://api.spotify.com/v1/me/top/${searchType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Top Response:", response.data);
        // setData(response.data);
        // setType(response.data.type);
        // setIsLoading(false);
      })
      .catch((e) => {
        console.log("THIS IS THE ERROR", e);
      });
  };

  return (
    <>
      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <UserDropdown
              email={data?.email}
              displayName={data?.display_name}
              signout={"Sign Out"}
              //TODO sign out and redirect
            />
            <DisplayButton
              label={"Your Top Artists"}
              onClick={() => {
                setSearchType("artists");
                handleSearch();
              }}
            />
            <DisplayButton
              label={"Your Top Tracks"}
              onClick={() => {
                setSearchType("tracks");
                handleSearch();
              }}
            />
          </>
        )}
      </div>
      <Container flud>
        <Row>
          <Col>
            {/* TODO Click on the card and use route params to grab data */}
            <Card
              style={{
                width: "25%",
                border: "solid green 1px",
              }}
            >
              {/* Map over the array and pull out what we want (title and song), and place it into a card component */}
              <Card.Title className="text-uppercase">Title</Card.Title>
              <Card.Text>Song</Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
