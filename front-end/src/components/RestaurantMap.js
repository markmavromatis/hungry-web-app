import React, {Component} from 'react';
import '../css/App.css';
import mapboxgl from 'mapbox-gl';

class RestaurantMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
          lng: this.props.mapAttributes.centerLongitude,
          lat: this.props.mapAttributes.centerLatitude,
          zoom: 12
        };
      }
    
      // Initialize map objects
      componentDidMount() {
        const { zoom } = this.state;
        const map = new mapboxgl.Map({
        container: this.mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.props.mapAttributes.centerLongitude, this.props.mapAttributes.centerLatitude],
        zoom: zoom
        });
        map.resize()
      }
    
      mapRef = React.createRef();

      render() {
        const { zoom } = this.state;
        return (
    
      <div>
      <div className='sidebarStyle'>
      <div>Longitude: {this.props.mapAttributes.centerLongitude} | Latitude: {this.props.mapAttributes.centerLatitude} | Zoom: {zoom}</div>
      </div>
      <div ref={this.mapRef} className="mapframe" />
      </div>
        )}
}
export default RestaurantMap;
