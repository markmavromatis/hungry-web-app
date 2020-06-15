# Hungry Web App Front End

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This code implements the front-end of the Hungry Web App. It allows users to register, search for restaurants, add favorites, and view / delete them.

Application screenshots can be found in the Screenshots/ folder.

## Installation Instructions

Three environment variables must be set before running the application:
- REACT_APP_HUNGRY_MAPBOX_TOKEN - Mapbox Service token
- REACT_APP_HUNGRY_REST_API_HOST - Rest API host
- REACT_APP_HUNGRY_REST_API_PORT - Rest API port

After setting up the environment variables and launching the REST API, run the web front-end server as follows:

- ```npm install```
- ```npm start```

The web application is hosted on port 3000 of the host server.


## NPM Modules

The project is built using several well known Node packages:

    "email-validator": "^2.0.4",
    "jsonwebtoken": "^8.5.1",
    "local-storage": "^2.0.0",
    "mapbox-gl": "^1.8.1",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-icons": "^3.10.0",
    "react-map-gl": "^5.2.7",
    "react-scripts": "3.4.1"

- email-validator - Validate email address in the UserID input field
- jsonwebtoken - Create and decode JSON web tokens
- localstorage - Allow setting and retrieving local storage fields
- mapbox-gl - MapBox API library
- react - Framework for writing web apps


## React Components

This single page web app consists of the following custom components:

- LoginUser - Initial screen. This is where users login to the application.
- RegisterUser - New users can register here for a new account.
- SearchRestaurants - This page is used to search for restaurants and view favorites.

## External Dependencies

This application has aß dependency on the [Mapbox Service](https://www.mapbox.com). This service includes a Geocoding service as well as a dynamic mapping service which leverages the [OpenStreetMap](https://www.openstreetmap.org/#map=4/38.01/-95.84) open source project. This application uses Mapbox to draw maps and render restaurant markers and popups.

The maps require setting a Mapbox Token key (as an environment variable). A limited use free key can be requested from the Mapbox service.

