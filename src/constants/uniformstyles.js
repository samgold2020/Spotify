import { Colors } from '../colors';

const styles = {
  pageBackground: {
    backgroundColor: Colors.darkGrey,
    minHeight: '100vh',
  },
  image: {
    borderRadius: '15px',
    maxHeight: '350px',
    minHeight: '100px',
    maxWidth: '350px',
    minWidth: '100px',
  },
  h1: {
    color: Colors.spotifyGreen,
    textAlign: 'center',
    margin: '15px',
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
  },
  lightBackground: {
    backgroundColor: Colors.lightGrey,
  },
  p: {
    fontSize: '1.2em',
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
  padding: {
    padding: '2em',
  },
  paragraphBorder: {
    border: `1px solid ${Colors.spotifyGreen}`,
    color: Colors.white,
    padding: '1em',
    fontSize: '1.5rem',
    borderRadius: '15px',
  },
};

export default styles;
