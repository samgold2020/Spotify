import { Colors } from '../colors';

const styles = {
  pageBackground: {
    backgroundColor: Colors.darkGrey,
    minHeight: '100vh',
  },
  image: {
    borderRadius: '15px',
    height: '350px',
  },
  h1: {
    color: Colors.spotifyGreen,
    fontSize: '3rem',
    fontWeight: 700,
    textAlign: 'center',
    margin: '15px',
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
  },
  padding: {
    padding: '2em',
  },
  paragraphBorder: {
    border: `1px solid ${Colors.spotifyGreen}`,
    color: Colors.white,
    padding: '2em',
    fontSize: '1.5rem',
    borderRadius: '15px',
  },
};

export default styles;
