import axios from "axios";
import React, { useEffect, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/DropdownToggle";

const UserDropdown = ({ onClick, email, displayName, signout, ...rest }) => {
  // const [token, setToken] = useState();
  // const [data, setData] = useState();

  // //Make a call to API for user information
  // useEffect(() => {
  //   if (localStorage.getItem("Access_Token")) {
  //     // console.log("SUCCESS", localStorage.getItem("Access_Token"));
  //     setToken(localStorage.getItem("Access_Token"));
  //     // console.log("We have the storage token", token);
  //   }
  // }, []);

  // const handleGetUser = () => {
  //   //TODO: Update this url with url from .env
  //   // console.log("INSIDE GET", token);
  //   axios
  //     .get("https://api.spotify.com/v1/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       // setData(response.data);
  //       console.log("THIS IS THE DATA", response);
  //     })
  //     .catch((e) => {
  //       console.log("THIS IS THE ERROR", e);
  //     });
  // };
  return (
    <>
      <div>HELLO IT ME, DROPDOWN</div>
      {/* <button onClick={handleGetUser}>GET USER</button> */}
      <Dropdown>
        <DropdownToggle
          variant="outline-secondary"
          className="btn-transparent avatar-toggle"
        >
          <Dropdown.Menu alignRight>
            <Dropdown.Header>{email}</Dropdown.Header>
            <Dropdown.Header>{displayName}</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item onClick={onClick}>{signout}</Dropdown.Item>
          </Dropdown.Menu>
        </DropdownToggle>
      </Dropdown>
    </>
  );
};

export default UserDropdown;
