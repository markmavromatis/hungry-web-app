import React, {Component} from 'react';
import '../css/App.css';
import SearchRestaurants from './SearchRestaurants';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';
import mapboxgl from "mapbox-gl"
import * as jwt from 'jsonwebtoken';

class App extends Component {


  constructor() {
    super();
    this.state = {
      formDisplay: "LoginUser",
      searchResults: [],
      favorites: [],
      submittedSearchAddress: "",
      viewport: {
        latitude : 0,
        longitude: 0,
        width: 400,
        height: 400,
        zoom: 12
      },
      userInfo: null,
      hostApi: process.env.REACT_APP_HUNGRY_REST_API_HOST + ":" + process.env.REACT_APP_HUNGRY_REST_API_PORT
    }

  
    this.updateFormDisplay = this.updateFormDisplay.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleGetFavorites = this.handleGetFavorites.bind(this);
    this.handleAddFavorite = this.handleAddFavorite.bind(this);
    this.handleDeleteFavorites = this.handleDeleteFavorites.bind(this);
  }

  handleDeleteFavorites() {
    console.log("Deleting favorites...")
    const bodyText = JSON.stringify({email: this.state.userInfo.email})
    const url = `http://${this.state.hostApi}/api/v0/favorites`
    fetch(url, {method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: bodyText
  })

  .then(res => {
    if (res.status == 200) {
      // Refresh the favorites
      this.setState({favorites : []})      
      // return
    } else {
      throw "FAILED TO DELETE FAVORITES"
    }
  }
  )

  }

  handleAddFavorite(restaurant) {
    console.log("Adding favorite: " + JSON.stringify(restaurant));
    const bodyText = JSON.stringify({
      email: this.state.userInfo.email, 
      restaurantId: restaurant.restaurantId,
      name: restaurant.name,
      url: restaurant.url,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      address1: restaurant.address1,
      city: restaurant.city,
      state: restaurant.state,
      zip: restaurant.zip});
      console.log("ZIP CODE = " + restaurant.zip);
    fetch(`http://${this.state.hostApi}/api/v0/favorites`, {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: bodyText
    })
    .then(res => {
      if (res.status == 201) {
        console.log("ADDED FAVORITE")
        this.setState({formDisplay: "SearchRestaurants"})
        // return res.json()
      } else {
        console.error(bodyText)
        throw "FAILED TO ADD FAVORITE. Status = " + res.status
      }
    }
    )
    .catch(e => {
      console.error(e)
    })

  }

  validateUser(userId, password) {

    const bodyText = JSON.stringify({email: userId, password: password});

    fetch(`http://${this.state.hostApi}/api/v0/users/auth/login`, {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: bodyText
    })
    .then(res => {
      if (res.status == 200) {
        console.log("AUTHENTICATED")
        console.log("JSON = " + JSON.stringify(res))
        console.log("Token = " + res.body.token)
        return res.json()
      } else {
        throw "INVALID"
      }
    }
    )
    .then(data => {
      this.setState({userInfo: jwt.decode(data.token)})
      this.setState({formDisplay: "SearchRestaurants"})
      
    })
    .catch(e => {
      console.error(e)
    })
    // .then((data) => {
    // }
  }

  logoutUser() {
    this.setState({userInfo: null});
    this.setState({formDisplay: "LoginUser"});
  }

  updateFormDisplay(e) {
    this.setState({formDisplay: e})
  }

  // Retrieve favorites for an email address
  handleGetFavorites(e) {

    this.setState({formDisplay: "Favorites"});
    console.log("Getting favorites: " + this.state.userInfo.email);
    fetch(`http://${this.state.hostApi}/api/v0/favorites/` + this.state.userInfo.email)
    .then(res => res.json())
    .then((data) => {
      this.setState({favorites : data})
    })
  }

  handleSearch(e) {

    if (!e) {
      // Nothing to search
      return false;
    }
    this.setState({formDisplay: "SearchRestaurants"});
    this.setState({submittedSearchAddress: e});

    // Identify longitude / latitude of the search address
    // for centering the map.
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + e + ".json?access_token=" + mapboxgl.accessToken)
    .then(res => res.json())
    .then((data) => {

      const center = data.features[0].center;
      this.setState({mapAttributes: {centerLongitude: center[0], centerLatitude: center[1]}});
    })
    .then(() => {
      // After geocoding, Search Yelp for nearby restaurants
      fetch(`http://${this.state.hostApi}/api/v0/restaurants?distanceInMiles=5&address=` + e)
        .then(res => res.json())
        .then((data) => {

        const restaurantsArray = []
        let i = 0;
        data.forEach(row => {
          i += 1
          restaurantsArray.push({"rownumber": i, "restaurantId": row.id, "name": row.name, "url": row.url, 
              "longitude": row.coordinates.longitude, "latitude": row.coordinates.latitude,
              "address1": row.location.address1, "city": row.location.city,
              "state": row.location.state, "zip": row.location.zip_code})

        })
        this.setState({viewport: {longitude: this.state.mapAttributes.centerLongitude, latitude: this.state.mapAttributes.centerLatitude, width: 400, height: 400, zoom: 12}})
        this.setState({searchResults: restaurantsArray});
      })
    .catch(console.log)
    })

  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LoginUser formDisplay={this.state.formDisplay === "LoginUser"}
            validateUser={this.validateUser}/>
          <RegisterUser formDisplay={this.state.formDisplay === "RegisterUser"}/>
          <SearchRestaurants formDisplay={this.state.formDisplay}
              updateFormDisplay={this.updateFormDisplay} handleSearch={this.handleSearch}
              searchResults={this.state.searchResults} submittedSearchAddress={this.state.submittedSearchAddress}
              mapAttributes={this.state.mapAttributes}
              viewport={this.state.viewport} logoutUser={this.logoutUser}
              handleGetFavorites = {this.handleGetFavorites} favorites={this.state.favorites}
              handleAddFavorite = {this.handleAddFavorite} handleDeleteFavorites = {this.handleDeleteFavorites}
        />

        </header>
      </div>
    );
  }
}

export default App;
