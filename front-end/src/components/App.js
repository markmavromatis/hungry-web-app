import React, {Component} from 'react';
import '../css/App.css';
import ViewFavorites from './ViewFavorites';
import SearchRestaurants from './SearchRestaurants';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';

class App extends Component {

  constructor() {
    super();
    this.state = {
      formDisplay: "SearchRestaurants",
      searchResults: []
    };

    this.updateFormDisplay = this.updateFormDisplay.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  // componentDidMount() {
  // }

  updateFormDisplay(e) {
    // this.preventDefault();
    // console.log("Setting form display to: Favorites..." + JSON.stringify(e));
    this.setState({formDisplay: e})
  }

  handleSearch(e) {
    console.log("Entering method handleSearch...");
    fetch('http://localhost:8080/api/v0/restaurants?distanceInMiles=5&address=107 Prospect Park W, Brooklyn, NY')
    .then(res => res.json())
    .then((data) => {
      // console.log(data);
      // console.log(Array.isArray(data));
      // console.log(data[0]);
      const restaurantsArray = []
      let i = 0;
      data.forEach(row => {
        i += 1
        restaurantsArray.push({"rownumber": i, "name": row.name, "longitude": row.coordinates.longitude, "latitude": row.coordinates.latitude})
      })
      this.setState({searchResults: restaurantsArray});

    })
    .catch(console.log)

    // this.updateFormDisplay("SearchRestaurants");
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
              searchResults={this.state.searchResults}/>
          <ViewFavorites formDisplay={this.state.formDisplay === "Favorites"}
              updateFormDisplay={this.updateFormDisplay} handleSearch={this.handleSearch}
              searchResults={this.state.searchResults}/>
        </header>
      </div>
    );
  }
}

export default App;
