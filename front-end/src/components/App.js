import React, {Component} from 'react';
import '../css/App.css';
import ViewFavorites from './ViewFavorites';
import SearchRestaurants from './SearchRestaurants';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';
import mapboxgl from "mapbox-gl"

class App extends Component {

  constructor() {
    super();
    this.state = {
      formDisplay: "SearchRestaurants",
      searchResults: [],
      submittedSearchAddress: "",
      mapCenterLong: 0,
      mapCenterLat: 0
    };

    this.updateFormDisplay = this.updateFormDisplay.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }


  updateFormDisplay(e) {
    this.setState({formDisplay: e})
  }

  handleSearch(e) {
    this.setState({submittedSearchAddress: e});

    // Identify longitude / latitude of the search address
    // for centering the map.
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + e + ".json?access_token=" + mapboxgl.accessToken)
    .then(res => res.json())
    .then((data) => {

      const center = data.features[0].center;
      this.setState({mapCenterLong: center[0], mapCenterLat: center[1]});
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
          restaurantsArray.push({"rownumber": i, "name": row.name, "longitude": row.coordinates.longitude, "latitude": row.coordinates.latitude})
        })
        this.setState({searchResults: restaurantsArray});
      })
    .catch(console.log)
    })

  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <LoginUser formDisplay={this.state.formDisplay === "Login"}/>
          <RegisterUser formDisplay={this.state.formDisplay === "RegisterUser"}/>
          <SearchRestaurants formDisplay={this.state.formDisplay === "SearchRestaurants"} 
              updateFormDisplay={this.updateFormDisplay} handleSearch={this.handleSearch}
              searchResults={this.state.searchResults} submittedSearchAddress={this.state.submittedSearchAddress}
              mapCenterLong={this.state.mapCenterLong} mapCenterLat={this.state.mapCenterLat}/>
          <ViewFavorites formDisplay={this.state.formDisplay === "Favorites"}
              updateFormDisplay={this.updateFormDisplay} handleSearch={this.handleSearch}
              searchResults={this.state.searchResults} submittedSearchAddress={this.state.submittedSearchAddress}/>
        </header>
      </div>
    );
  }
}

export default App;
