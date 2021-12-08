import React, { useState, useEffect } from "react";

import axios from "axios";

import UserDropdown from "../../components/DropdownMenu";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Splash() {
  const [token, setToken] = useState();
  const [data, setData] = useState();

  //Make a call to API for user information
  useEffect(() => {
    if (localStorage.getItem("Access_Token")) {
      // console.log("SUCCESS", localStorage.getItem("Access_Token"));
      setToken(localStorage.getItem("Access_Token"));
      // console.log("We have the storage token", token);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // setData(response);
          console.log("THIS IS THE DATA", response.data);
        })
        .catch((e) => {
          console.log("THIS IS THE ERROR", e);
        });
    }
  }, [token]);

  return (
    <div style={{ backgroundColor: "green", height: "100%" }}>
      {/* <div>Splash Page</div> */}
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
