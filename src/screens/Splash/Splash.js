import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link, Route } from "react-router-dom";

import UserDropdown from "../../components/DropdownMenu";
import DisplayButton from "../../components/Button";
import ContentCard from "../../components/Card";
import ModalConfirmation from "../../components/Modal";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default function Splash() {
  const [token, setToken] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchType, setSearchType] = useState("artists");
  const [topData, setTopData] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Access_Token")) {
      setToken(localStorage.getItem("Access_Token"));
      setIsLoading(false);
      if (token) {
        axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(response?.data);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log("THIS IS THE ERROR", e);
            // localStorage.clear();
          });
      }
    } else {
      console.log("This will eventually be the logout");
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
        setTopData(response.data.items);
        console.log("TOP DATA", topData);
      })
      .catch((e) => {
        console.log("THIS IS THE ERROR", e);
        setShow(true);
      });
  };

  const signoutModal = () => {
    return (
      <>
        <ModalConfirmation
          title={"You are logged out"}
          body={
            "You have been logged out due to inactivity, please proceed to log back in."
          }
          buttonTitle={"Login"}
          onClick={() => {
            // <Link to="/login" />;
            // console.log("CLICK");
          }}
          isOpen={show}
        />
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <UserDropdown
            email={data?.email}
            displayName={data?.display_name}
            signout={"Sign Out"}
            //TODO sign out and redirect
            onClick={() => {
              localStorage.clear();
              setToken();
            }}
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

      <Container>
        <Row className="justify-content-md-center">
          {topData?.map((item, index) => (
            <ContentCard
              key={index}
              title={item?.name}
              footerText={"Visit the artist"}
              onClick={() => console.log("Clicked")}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}
