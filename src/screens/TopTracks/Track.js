import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

import { Colors } from '../../colors';
import SpinLoader from '../../components/SpinLoader';
import styles from './styles';
import DisplayButton from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import uniformStyles from '../../constants/uniformstyles';
import { getTrackAudioFeatures } from '../../queryHelper';

function Track() {
  const [trackData, setTrackData] = useState('');
  const [percentData, setPercentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keySignature, setKeySignature] = useState('');
  const [mode, setMode] = useState('');

  const [showData, setShowData] = useState('');

  const location = useLocation();

  const { token } = useAuth();

  useEffect(() => {
    viewTrack(location.state.detail);
  }, [token]);

  const viewTrack = async trackId => {
    const res = await getTrackAudioFeatures(trackId, token);
    if (res) {
      setTrackData(res);
      setIsLoading(false);
      manipulateData(res);
      readableKeySignature(res?.key);
      if (res?.mode === 1) {
        setMode('Major');
      } else {
        setMode('Minor');
      }
    }
  };

  const manipulateData = trackData => {
    let percentDataArr = [];

    const displayPercentData = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness',
      'valence',
    ];

    Object.entries(trackData)?.map(([key, value]) => {
      if (displayPercentData?.includes(key)) {
        let percent = (value * 100).toFixed(0);
        return percentDataArr.push([key, percent]);
      }
    });
    setPercentData(percentDataArr);
  };

  const readableKeySignature = keyIndexSpotify => {
    const keyData = {
      0: 'C',
      1: 'C#/Db',
      2: 'D',
      3: 'D#/Eb',
      4: 'E',
      5: 'F',
      6: 'F#/Gb',
      7: 'G',
      8: 'G#/Ab',
      9: 'A',
      10: 'A#/Bb',
      11: 'B',
    };

    Object.entries(keyData).map(([k, v]) => {
      if (k === keyIndexSpotify.toString()) {
        return setKeySignature(v);
      } else if (keyIndexSpotify === -1) {
        return setKeySignature('No key signuatre detectable');
      }
    });
  };

  function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const displaySongInformation = item => {
    const displayPercentData = [
      {
        id: 'acousticness',
        percentScore: `${item[1]}% `,
        details: ` A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.`,
      },
      {
        id: 'danceability',
        percentScore: `${item[1]}% `,
        details:
          'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.',
      },
      {
        id: 'energy',
        percentScore: `${item[1]}% `,
        details: `Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.`,
      },
      {
        id: 'instrumentalness',
        percentScore: `${item[1]}% `,
        details: `Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.`,
      },
      {
        id: 'liveness',
        percentScore: `${item[1]}% `,
        details: `Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.`,
      },
      {
        id: 'speechiness',
        percentScore: `${item[1]}% `,
        details: `Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.`,
      },
      {
        id: 'valence',
        percentScore: `${item[1]}% `,
        details: `A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)`,
      },
    ];

    displayPercentData.map(value => {
      if (item[0] === value.id) {
        setShowData(value);
      }
    });
  };

  return (
    <Container fluid style={uniformStyles.pageBackground}>
      {isLoading ? (
        <SpinLoader />
      ) : (
        <>
          <Row>
            <Col style={styles.centerImage}>
              <img
                style={uniformStyles.image}
                src={location.state.art}
                alt={`${location.state.title} by ${location.state.artist}`}
              />
              <h1 style={uniformStyles.h1}>
                {`${location.state.title} - ${location.state.artist}`}
              </h1>
              <p style={uniformStyles.p}>{`Key: ${keySignature} ${mode}`}</p>
              <p
                style={uniformStyles.p}
              >{`Duration: ${millisToMinutesAndSeconds(
                trackData.duration_ms,
              )}`}</p>
              <p style={uniformStyles.p}>
                {' '}
                {`Tempo: ${Math.round(trackData.tempo)} BPM`}
              </p>
            </Col>
          </Row>

          <Row style={{ backgroundColor: Colors.lightGrey, padding: '20px' }}>
            {percentData?.map(item => (
              <Col
                style={{
                  margin: '10px',
                }}
              >
                <ListGroup>
                  <DisplayButton
                    label={`${item[0]}`}
                    primary={false}
                    onClick={() => displaySongInformation(item)}
                  />
                </ListGroup>
              </Col>
            ))}
          </Row>
        </>
      )}
      {showData && (
        <>
          <Alert style={styles.alertData}>
            <Alert.Heading>{`${showData.id} ${showData.percentScore}`}</Alert.Heading>
            <hr />
            <p>{showData.details}</p>
            <div className="d-flex justify-content-end">
              <DisplayButton
                primary={false}
                label={'Close'}
                onClick={() => setShowData(!showData)}
              />
            </div>
          </Alert>
        </>
      )}
    </Container>
  );
}

export default Track;
