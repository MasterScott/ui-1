import React, {Component} from 'react';
import AudioPlayer from './audio-player';
import moment from 'moment';

const InfoDisplay = (props) => {
  return (
    <div className='info-display'>
     <h3>Record Details</h3>
     <p>Date/Time Recorded: {moment(props.daterecorded).format("YYYY-MM-DD HH:mm")}</p>
     <img src={props.image_url} />
     <AudioPlayer audio_url={props.audio_url} />
    </div>
  );
}

module.exports = InfoDisplay;
