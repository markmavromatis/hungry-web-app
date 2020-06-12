import React, {Component} from 'react';
import '../css/App.css';
import mapboxgl from 'mapbox-gl';

class RestaurantMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
          lng: this.props.mapCenterLong,
          lat: this.props.mapCenterLat,
          zoom: 12
        };
      }
    
      // Initialize map objects
      componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
        container: this.mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.props.mapCenterLong, this.props.mapCenterLat],
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
      <div>Longitude: {this.props.mapCenterLong} | Latitude: {this.props.mapCenterLat} | Zoom: {zoom}</div>
      </div>
      <div className="mapframe" ref={this.mapRef} className="mapframe" />
      </div>
        )}
}
export default RestaurantMap;
