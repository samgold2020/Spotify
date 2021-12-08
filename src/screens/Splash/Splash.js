import React, { useState, useEffect } from "react";

import axios from "axios";

import UserDropdown from "../../components/DropdownMenu";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownToggle from "react-bootstrap/DropdownToggle";
// import DropdownButton from "react-bootstrap/DropdownButton";

export default function Splash() {
  const [token, setToken] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchType, setSearchType] = useState("artists");

  useEffect(() => {
    if (localStorage.getItem("Access_Token")) {
      setToken(localStorage.getItem("Access_Token"));
      if (token) {
        axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("Response:", response.data);
            setData(response.data);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log("THIS IS THE ERROR", e);
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
              email={data.email}
              displayName={data.display_name}
              signout={"Sign Out"}
              //TODO sign out and redirect
            />
            <button
              onClick={() => {
                setSearchType("artists");
                handleSearch();
              }}
            >
              Your Top Artists
            </button>
            <button
              onClick={() => {
                setSearchType("tracks");
                handleSearch();
              }}
            >
              Your Top Tracks
            </button>
          </>
        )}
      </div>
    </>
  );
}
