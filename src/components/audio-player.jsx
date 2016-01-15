var React = require('react');

module.exports = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.audio_url === this.props.audio_url) return;
    setTimeout(() => {
      this.aPlayer.load();
      this.aPlayer.play();
    } , 0)
  },
  render: function() {
    return <audio ref={(aPlayer) => this.aPlayer = aPlayer} controls="controls">
      <source src={this.props.audio_url} type="audio/aac"></source>
    </audio>
  }
})
