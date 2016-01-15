var React = require('react');
var AudioPlayer = require('./audio-player');

module.exports = React.createClass({
  render: function() {
    return <div>
      <h3>Record Details</h3>
      <img src={this.props.record.image_url} />
      <AudioPlayer audio_url={this.props.record.audio_url} />
    </div>
  }
});
