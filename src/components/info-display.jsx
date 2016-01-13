var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <div>
      <h3>Record Details</h3>
      <img src={this.props.record.image_url} />
      <audio controls="controls">
        <source src={this.props.record.audio_url} type="audio/aac"></source>
      </audio>
    </div>
  }
});
