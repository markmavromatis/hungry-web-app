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
