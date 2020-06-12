import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './css/index.css';
import App from './components/App';

// Personal Mapbox Token
mapboxgl.accessToken = process.env.REACT_APP_HUNGRY_MAPBOX_TOKEN;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
