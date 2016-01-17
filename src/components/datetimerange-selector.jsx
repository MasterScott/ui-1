var React = require('react');
var moment = require('moment');
var RangePicker = require('react-daterange-picker');
var TimePicker= require('./timerange-selector');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedDate: null
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
      <TimePicker/>
    </div>

  },
  handleDateChange: function(date, event) {
    this.setState({selectedDate: date});
    this.props.onValueChanged({
      fromDateTime: moment(this.state.selectedDate).hour(0).minute(0).second(0),
      toDateTime: moment(this.state.selectedDate).hour(23).minute(59).second(59)
    }, event);
  }
})
