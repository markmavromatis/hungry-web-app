import React, {Component} from 'react';
import '../css/App.css';
import ViewFavorites from './ViewFavorites';
import ViewSearchResults from './ViewSearchResults';
import SearchRestaurants from './SearchRestaurants';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';

class App extends Component {

  constructor() {
    super();
    this.state = {
      formDisplay: "SearchRestaurants"
    };

    this.updateFormDisplay = this.updateFormDisplay.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  updateFormDisplay(e) {
    // this.preventDefault();
    // console.log("Setting form display to: Favorites..." + JSON.stringify(e));
    this.setState({formDisplay: e})
  }

  handleSearch(e) {
    this.setState({searchResults: [{"name": "Hardys", "address": "101 Main St"}, {"name": "McDonalds", "address": "102 Main St"}]});
    this.updateFormDisplay("SearchRestaurants");
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
              updateFormDisplay={this.updateFormDisplay} handleSearch={this.handleSearch}/>
          <ViewFavorites formDisplay={this.state.formDisplay === "Favorites"}
              updateFormDisplay={this.updateFormDisplay} handleSearch={this.handleSearch}/>
          <ViewSearchResults formDisplay={this.state.formDisplay === "ViewSearchResults"}/>
        </header>
      </div>
    );
  }
}

export default App;
