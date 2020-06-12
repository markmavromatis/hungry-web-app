import React, {Component} from 'react';
import '../css/App.css';
import ViewFavorites from './ViewFavorites';
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
      submittedSearchAddress: "",
      viewport: {
        latitude : 0,
        longitude: 0,
        width: 400,
        height: 400,
        zoom: 12
      },
      userInfo: null
    }
  
    this.updateFormDisplay = this.updateFormDisplay.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  validateUser(userId, password) {
    const bodyText = JSON.stringify({email: userId, password: password});
    console.log("BodyText: " + bodyText);
    fetch("http://localhost:8080/api/v0/users/auth/login", {method: 'POST',
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

  handleSearch(e) {
    console.log("Access token = " + mapboxgl.accessToken);
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
      fetch("http://localhost:8080/api/v0/restaurants?distanceInMiles=5&address=" + e)
        .then(res => res.json())
        .then((data) => {

        const restaurantsArray = []
        let i = 0;
        data.forEach(row => {
          i += 1
          restaurantsArray.push({"rownumber": i, "name": row.name, "url": row.url, "longitude": row.coordinates.longitude, "latitude": row.coordinates.latitude})

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
          <SearchRestaurants formDisplay={this.state.formDisplay === "SearchRestaurants"} 
              updateFormDisplay={this.updateFormDisplay} handleSearch={this.handleSearch}
              searchResults={this.state.searchResults} submittedSearchAddress={this.state.submittedSearchAddress}
              mapAttributes={this.state.mapAttributes}
              viewport={this.state.viewport} logoutUser={this.logoutUser}
        />
          <ViewFavorites formDisplay={this.state.formDisplay === "Favorites"}
              updateFormDisplay={this.updateFormDisplay} handleSearch={this.handleSearch}
              searchResults={this.state.searchResults} submittedSearchAddress={this.state.submittedSearchAddress}/>
        </header>
      </div>
    );
  }
}

export default App;
