var React = require('react');
var AudioPlayer = require('./audio-player');
var moment = require('moment');

module.exports = React.createClass({
  render: function() {
    return <div>
      <h3>Record Details</h3>
      <p>Date/Time Recorded: {moment(this.props.daterecorded).format("YYYY-MM-DD HH:mm")}</p>
      <img src={this.props.image_url} />
      <AudioPlayer audio_url={this.props.audio_url} />
    </div>
  }
});
