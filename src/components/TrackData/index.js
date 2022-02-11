import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Colors } from '../../colors';

const TrackData = ({ title, value, text }) => (
  <>
    <Row>
      <div>{title}</div>
      <Col>
        <div style={{ width: 200, height: 200 }}>
          <CircularProgressbar
            value={value}
            text={text}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              // rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'butt',

              // Text size
              textSize: '16px',

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              // pathColor: `rgba(62, 152, 199, ${value / 100})`,

              // trailColor: '#d6d6d6',
              //   backgroundColor: '#3e98c7',
            })}
          />
        </div>
      </Col>
    </Row>
  </>
);

export default TrackData;
