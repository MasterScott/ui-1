var React = require('react');
var moment = require('moment');
var TimePicker = require('react-time-picker/lib');

module.exports = React.createClass({
  getInitialState: function() {
    console.log(this.props.fromTime);
    return {
      startValue: this.props.fromTime,
      endValue: this.props.toTime
    };
  },
  render: function() {
    return <div>
      <h4>From Time:</h4>
      <TimePicker
        value={this.state.startValue}
        onChange={this.handleStartTimeChange}/>
      <h4>To Time:</h4>
      <TimePicker
        value={this.state.endValue}
        onChange={this.handleEndTimeChange}/>
    </div>
  },
  handleStartTimeChange: function(value, moment) {
    this.setState({startValue: moment}, this.updateSelectedTimeRange);
  },
  handleEndTimeChange: function(value, moment) {
    this.setState({endValue: moment}, this.updateSelectedTimeRange);
  },
  updateSelectedTimeRange: function() {
    this.props.onValueChanged({
      selectedFromTime: this.state.startValue,
      selectedToTime: this.state.endValue
    });
  }
})
