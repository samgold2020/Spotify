import React from 'react';

import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import { Colors } from '../../colors';

const ArtistTable = ({ data }) => {
  console.log('data in table', data);

  const history = useHistory();

  const handleClick = songId => {
    history.push({
      pathname: '/viewtrack',
      state: { detail: songId },
    });
  };
  return (
    <Table
      striped
      bordered
      hover
      responsive="sm"
      // size="sm"
      variant="dark"
      bordered={false}
    >
      <thead>
        <tr style={{ color: Colors.white }}>
          <th></th>
          <th>Artist</th>
          <th>Song</th>
          <th>Album</th>
        </tr>
      </thead>
      <tbody
        style={
          {
            // backgroundColor: 'green',
          }
        }
      >
        {data?.items.map(song => (
          <tr
            onClick={() => handleClick(song.id)}
            style={{ color: Colors.white }}
          >
            <td>
              <img
                style={{ width: '40px' }}
                src={song.album.images[2].url}
                alt={`${song.artists[0].name} Album Art`}
              />
            </td>
            <td>{song.artists[0].name}</td>
            <td>{song.name}</td>
            <td>{song.album.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ArtistTable;
