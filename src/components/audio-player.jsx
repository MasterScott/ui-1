import React, {Component} from 'react';


class AudioPlayer extends Component {
  render() {
    return (
      <audio ref={(aPlayer) => this.aPlayer = aPlayer} controls="controls">
        <source src={this.props.audio_url} type="audio/aac"></source>
      </audio>
    );
  }

  componentWillReceiveProps(props) {
    if (props.audio_url === this.props.audio_url) return;
    setTimeout(() => {
      this.aPlayer.load();
      this.aPlayer.play();
    } , 0)
  }
}

module.exports = AudioPlayer;
