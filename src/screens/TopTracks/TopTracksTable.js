import React from 'react';

import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { Colors } from '../../colors';
import DisplayButton from '../../components/Button';

const ArtistTable = ({ data }) => {
  const history = useHistory();

  const handleClick = song => {
    console.log('SONG', song);
    history.push({
      pathname: '/viewtrack',
      state: {
        detail: song.id,
        artist: song.artists[0].name,
        title: song.name,
        art: song.album.images[0].url,
      },
    });
  };
  return (
    <Table striped hover responsive="sm" variant="dark" bordered={false}>
      <thead>
        <tr style={{ color: Colors.white }}>
          <th></th>
          <th></th>
          <th>Artist</th>
          <th>Song</th>
          <th>Album</th>
          <th>Navigation</th>
        </tr>
      </thead>
      <tbody>
        {data?.items.map((song, index) => (
          <tr style={{ color: Colors.white }}>
            <td>{index + 1}</td>
            <td>
              <img
                src={song.album.images[2].url}
                alt={`${song.artists[0].name} Album Art`}
              />
            </td>
            <td>{song.artists[0].name}</td>
            <td>{song.name}</td>
            <td>{song.album.name}</td>
            <td>
              <DisplayButton
                onClick={() => handleClick(song)}
                primary={false}
                label={'Discover'}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ArtistTable;
