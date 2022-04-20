import { Colors } from '../../colors';

const styles = {
  buttonPrimary: hoverPrimary => ({
    backgroundColor: hoverPrimary ? Colors.lightGrey : Colors.spotifyGreen,
    borderColor: Colors.spotifyGreen,
    color: hoverPrimary ? Colors.spotifyGreen : Colors.lightGrey,
    fontSize: '1.5em',
  }),
  buttonSecondary: hoverSecondary => ({
    backgroundColor: hoverSecondary ? Colors.spotifyGreen : Colors.lightGrey,
    borderColor: Colors.spotifyGreen,
    color: hoverSecondary ? Colors.lightGrey : Colors.spotifyGreen,
    fontSize: '1.5em',
  }),
};

export default styles;
