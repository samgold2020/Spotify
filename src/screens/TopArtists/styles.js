import { Colors } from '../../colors';

const styles = {
  pageBackground: {
    backgroundColor: Colors.darkGrey,
    width: '100vw',
    height: '100vh',
  },
  carouselImage: {
    borderRadius: '15px',
    maxHeight: '600px',
  },
  image: {
    borderRadius: '15px',
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
  padding: {
    padding: '2em',
  },
  p: {
    fontSize: '1em',
    color: Colors.white,
    textAlign: 'center',
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
