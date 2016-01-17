var React = require('react');
var moment = require('moment');
var RangePicker = require('react-daterange-picker');
var TimePicker= require('./timerange-selector');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedDate: null,
      fromTime: moment('00:00', 'HH:mm'),
      toTime: moment('23:59', 'HH:mm')
    };
  },
  render: function() {
    return <div>
      <RangePicker
        numberOfCalendars={this.props.numberOfCalendars}
        selectionType={this.props.selectionType}
        minimumDate={new Date('2016-01-01T00:00:00')}
        onSelect={this.handleDateChange}
        value={this.state.selectedDate} />
      <TimePicker
        fromTime = {this.state.fromTime}
        toTime = {this.state.toTime}
        onValueChanged={this.handleTimeChange}/>
    </div>
  },
  handleDateChange: function(date, event) {
    this.setState({selectedDate: date}, this.updateDateTime);
  },
  handleTimeChange: function(times) {
    this.setState({
      fromTime: times.selectedFromTime,
      toTime: times.selectedToTime
    }, this.updateDateTime);
  },
  updateDateTime: function() {
    this.props.onValueChanged({
      fromDateTime: moment(this.state.selectedDate).hour(this.state.fromTime.hour()).minute(this.state.fromTime.minute()),
      toDateTime: moment(this.state.selectedDate).hour(this.state.toTime.hour()).minute(this.state.toTime.minute())
    }, event);
  }
})
