import React, {Component} from 'react';
import moment from 'moment';
import TimePicker from 'react-time-picker/lib';

class TimeRangeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: props.fromTime,
      endValue: props.toTime
    };
  }

  render() {
    return (
      <div>
        <h4>From Time:</h4>
        <TimePicker
          value={this.state.startValue}
          onChange={(value, moment) => {this.setState({startValue: moment}, this.updateSelectedTimeRange)}}/>
        <h4>To Time:</h4>
        <TimePicker
          value={this.state.endValue}
          onChange={(value, moment) => {this.setState({endValue: moment}, this.updateSelectedTimeRange)}}/>
      </div>
    );
  }

  updateSelectedTimeRange() {
    this.props.onValueChanged({
      selectedFromTime: this.state.startValue,
      selectedToTime: this.state.endValue
    });
  }
}


module.exports = TimeRangeSelector;
