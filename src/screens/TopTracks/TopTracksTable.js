import React from "react";

import { useHistory } from "react-router-dom";


const Table = ({ data }) => {
    console.log("data in table", data)

    const history = useHistory();


    const handleClick = (songId) => {
        history.push({
            pathname: "/viewtrack",
            state: { detail: songId },
          });
     }
  return (
    <div>
      <table>
        <thead>
          <tr>
              <th>Artist</th>
              <th>Song</th>
              <th>Album</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map(song => (
            <tr onClick={() => handleClick(song.id)}>
                {/* <td>
                    <img style={{width: '8%', margin:'10px'}} src={song.album.images[0].url}/>
                </td> */}
                <td>
                {song.artists[0].name}
                </td>
                <td>{song.name}</td>
                <td>{song.album.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
