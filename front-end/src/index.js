import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './css/index.css';
import App from './components/App';

// Personal Mapbox Token
mapboxgl.accessToken = "pk.eyJ1IjoibWFya21hdnJvbWF0aXMiLCJhIjoiY2tiYXN2amNvMG1yYTJxbzRscnhqOXpoeCJ9.wnVVLpKx-JulTuNBck5RGw";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// class Application extends React.Component {
//   mapRef = React.createRef();

//   constructor(props) {
//     super(props);
//     this.state = {
//     lng: 5,
//     lat: 34,
//     zoom: 2
//     };
//   }

//   componentDidMount() {
//     const { lng, lat, zoom } = this.state;
//     const map = new mapboxgl.Map({
//     container: this.mapRef.current,
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [lng, lat],
//     zoom: zoom
//     });
//   }

//   render() {
//     const { lng, lat, zoom } = this.state;
//     return (
// <div>
// <div className='sidebarStyle'>
// <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
// </div>
// <div ref={this.mapRef} className="absolute top right left bottom" />
// </div>

// )
//     }
//   }

// ReactDOM.render(<React.StrictMode><Application /></React.StrictMode>, document.getElementById("root"));
