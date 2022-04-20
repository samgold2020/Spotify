import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import DisplayButton from '../Button/index';

const TrackData = ({ title, value, text }) => (
  <>
    {/* <div>
      <DisplayButton
        label={title}
        onClick={() => console.log('TODO//Hover over for explination')}
      >
        {title}
      </DisplayButton>
    </div> */}
    <Row>
      <Col style={{ maxWidth: '10em' }}>
        <CircularProgressbar
          value={value}
          text={text}
          styles={buildStyles({
            strokeLinecap: 'butt',
            textSize: '1em',
            pathTransitionDuration: 0.5,
          })}
        />
      </Col>
    </Row>
  </>
);

export default TrackData;
