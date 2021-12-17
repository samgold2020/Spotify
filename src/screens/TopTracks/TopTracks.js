import React, { useState, useEffect } from "react";

import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";

import { Colors } from "../../colors";
import SpinLoader from "../../components/SpinLoader";

function TopTracks(){
    const [topSongs, setTopSongs] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("Access_Token");
        if (token) {
          getSongs(token);
        } else {
          //No token
          console.log("No ToKen");
        }
      }, []);
    
      const getSongs = async (token) => {
        try {
          let res = await axios({
            url: "https://api.spotify.com/v1/me/top/tracks",
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200) {
            console.log("Response", res.data);
            setTopSongs(res.data)
            setIsLoading(false)
          }
          return topSongs;
        } catch (err) {
          console.log("THIS IS The ERROR");
        }
      };
      console.log("TOP SONGS", topSongs)

     const handleClick = (songId) => {
        history.push({
            pathname: "/viewtrack",
            state: { detail: songId },
          });
     }

    return (
        <>
      <div style={{ backgroundColor: Colors.darkGrey, minHeight: "100vh" }}>
        <Container fluid>
            {isLoading ? (
                <SpinLoader />
            ) : (
            <>
             <Row style={{marginLeft:'5%'}}>
                 <Col>Name:</Col>
                 <Col>Album:</Col>
             </Row>
         {topSongs?.items.map((item, index) => (
             <>
             <Row  onClick={() => {
                 handleClick(item.id)
                 }}>
                 <Col style={{color: Colors.white,  display: 'flex', alignItems: 'center'}}>
                 <img style={{width: '8%', margin:'10px'}} src={item.album.images[0].url}/>
                     <Col style={{}}>{item?.name}</Col></Col>
                 <Col style={{color: Colors.white, display: 'flex', alignItems: 'center'}}>{item?.album.name}</Col>
             </Row>
             </>
           ))} 
           </>
            )}
        </Container>
      </div>
        </>
    );
}

export default TopTracks