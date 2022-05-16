import { Colors } from '../../colors';

const styles = {
  container: {
    backgroundColor: Colors.darkGrey,
    minHeight: '100vh',
  },
  image: {
    borderRadius: '15px',
    height: '350px',
  },
  centerImage: {
    paddingTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: Colors.spotifyGreen,
  },
  h1: {
    color: Colors.spotifyGreen,
    fontSize: '3rem',
    fontWeight: 700,
    textAlign: 'center',
    margin: '15px',
  },
  p: {
    fontSize: '1.2em',
    color: Colors.white,
    textAlign: 'center',
  },
};

export default styles;
