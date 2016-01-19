import DatePicker from 'react-daterange-picker';
import TimePicker from './timerange-selector';
import React, {Component} from 'react';
import moment from 'moment';

class DateTimeRangeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: null,
      fromTime: moment('00:00', 'HH:mm'),
      toTime: moment('23:59', 'HH:mm')
    };
  }

  render() {
    return (
      <div>
        <DatePicker
          numberOfCalendars={this.props.numberOfCalendars}
          selectionType={this.props.selectionType}
          minimumDate={new Date('2016-01-01T00:00:00')}
          onSelect={(date, event) => {this.setState({selectedDate: date}, this.updateDateTime)}}
          value={this.state.selectedDate} />
        <TimePicker
          fromTime = {this.state.fromTime}
          toTime = {this.state.toTime}
          onValueChanged={this.handleTimeChange.bind(this)}/>
      </div>
    );
  }

  handleTimeChange(times) {
    console.log(times);
    this.setState({
      fromTime: times.selectedFromTime,
      toTime: times.selectedToTime
    }, this.updateDateTime);
  }

  updateDateTime() {
    console.log(this.state);
    this.props.onValueChanged({
      fromDateTime: moment(this.state.selectedDate).hour(this.state.fromTime.hour()).minute(this.state.fromTime.minute()),
      toDateTime: moment(this.state.selectedDate).hour(this.state.toTime.hour()).minute(this.state.toTime.minute())
    }, event);
  }
}

module.exports = DateTimeRangeSelector;
