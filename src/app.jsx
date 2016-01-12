var React = require('react');
var ReactDOM = require('react-dom');
var Api = require('./utils/api');
var GoogleMap = require('react-google-maps/lib/GoogleMap');
var GoogleMapLoader = require('react-google-maps/lib/GoogleMapLoader');
var Marker = require('react-google-maps/lib/Marker');
var Polyline = require('react-google-maps/lib/Polyline');

var App = React.createClass({
  getInitialState: function() {
    return {
      locations: []
    };
  },
  componentWillMount: function() {
    this.getUserLocationData();
  },
  render: function() {
    return <div className="row">
      <div className="medium-6 large-4 columns">
        <h2>Columbus</h2>
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
  handleBoundsChanged: function() {
    this.setState({
      bounds: this.gmapComponent.getBounds().toUrlValue()
    });

    this.getUserLocationData();
  },
  getUserLocationData: function() {
    var queryURL = "records/get?account_id=" + 12 + "&bounds=" + this.state.bounds;
    Api.get(queryURL)
      .then(function(json){
        this.setState({locations: json.data});
      }.bind(this));
  }
})

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
