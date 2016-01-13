var React = require('react');
var ReactDOM = require('react-dom');
var Api = require('./utils/api');
var GoogleMap = require('react-google-maps/lib/GoogleMap');
var GoogleMapLoader = require('react-google-maps/lib/GoogleMapLoader');
var Marker = require('react-google-maps/lib/Marker');
var Polyline = require('react-google-maps/lib/Polyline');
var RangePicker = require('react-daterange-picker');

var App = React.createClass({
  getInitialState: function() {
    return {
      locations: [],
      users: [],
      selectedUser: -1,
      selectedDate: null
    };
  },
  componentWillMount: function() {
    this.getUsers();
    this.getUserLocationData();
  },
  render: function() {
    return <div className="row">
      <div className="medium-6 large-4 columns">
        <h2>Columbus</h2>
        <label>Select Menu
          <select onChange={this.handleVictimChange}>
            {this.renderVictims()}
          </select>
        </label>
        <h2>Select Date</h2>
        <RangePicker
          numberOfCalendars={1}
          selectionType="single"
          minimumDate={new Date('2016-01-01T00:00:00')}
          onSelect={this.handleDateChange}
          value={this.state.selectedDate} />
      </div>
      <div className="medium-6 large-8 columns map-container">
        <section className="medium-6 large-8 columns map-container">
          <GoogleMapLoader
            containerElement={
              <div
                {...this.props}
                style={{
                  height: "100%",
                }}
              />
            }
            googleMapElement={
              <GoogleMap
                ref={(map) => this.gmapComponent = map}
                onDragend={this.handleBoundsChanged}
                defaultZoom={12}
                defaultCenter={{lat: 1.343985, lng: 103.871613}}>
                {this.renderMarkers()}
                {this.renderPolyline()}

              </GoogleMap>
            }
          />
        </section>
      </div>
    </div>
  },
  renderPolyline: function() {
    if (this.state.locations) {
      var path = this.state.locations.map(function(location) {
        return location.location;
      });

      return <Polyline path={path}/>
    }
  },
  renderMarkers: function() {
    if (this.state.locations) {
      return this.state.locations.map(function(location) {
        return <Marker className="marker" position={location.location} key={location.daterecorded}/>
      });
    }
  },
  renderVictims: function() {
    return this.state.users.map(function(user) {
      return <option value={user.id} key={user.id}>{user.email}</option>
    });
  },
  handleBoundsChanged: function() {
    this.setState({
      bounds: this.gmapComponent.getBounds().toUrlValue()
    });

    this.getUserLocationData();
  },
  handleVictimChange: function(event) {
    this.setState({selectedUser: parseInt(event.target.value)});
  },
  handleDateChange: function(date, event) {
    this.setState({selectedDate: date});
    this.getUserLocationData();
  },
  getUsers: function() {
    Api.get('users/get')
      .then(function(json) {
        console.log(json);
        this.setState({users: json.data, selectedUser: json.data[0].id});
      }.bind(this));
  },
  getUserLocationData: function(completion) {
    var dateQuery = (this.state.selectedDate ? "&from_datetime=" + this.state.selectedDate.toISOString() + "&to_datetime=" + this.state.selectedDate.endOf("day").toISOString() : null);
    var queryURL = "records/get?account_id=" + this.state.selectedUser + "&bounds=" + this.state.bounds + (this.state.selectedDate ? dateQuery: '' );
    console.log(queryURL);
    Api.get(queryURL)
      .then(function(json){
        this.setState({locations: json.data});
      }.bind(this));
  }
})

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
