import React, {Component} from 'react';
import '../css/App.css';

class SearchRestaurants extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleAdd = this.handleAdd.bind(this);
  }
  handleSearch(e) {
    this.setState({searchResults: [{"name": "Hardys", "address": "101 Main St"}, {"name": "McDonalds", "address": "102 Main St"}]})
    console.log("Hello world")
  };

  render() {
  return (
      <div>
      <div id="criteria" className={this.props.formDisplay ? '' : 'hide-component'}>
        <p>Search Restaurants</p>
          <label>Address:&nbsp;&nbsp;</label>
          <input type="text" id="searchLocation" size="50" name="searchLocation"/>
          &nbsp;&nbsp;
          <button type="button"  onClick={this.handleSearch}>Search</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a id="Favorites" onClick={(e) => this.props.updateFormDisplay("Favorites")}>My Favorites</a>
          
      </div>
      <div id="results">
        {JSON.stringify(this.state.searchResults)}
      </div>
    </div>
  );
  }
}

export default SearchRestaurants;
