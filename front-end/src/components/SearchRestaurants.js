import React, {Component} from 'react';
import '../css/App.css';
import RestaurantMap from './RestaurantMap';

class SearchRestaurants extends Component {

  constructor() {
    super()
    this.state = {
      searchLocation: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    // console.log("Name: " + name + " \tValue = " + value)

    this.setState({
      [name]: value
    });

  }


  render() {

    return (
      <div key={this.props.searchResults}>
      <div id="criteria" className={this.props.formDisplay ? '' : 'hide-component'}>
        <p>Search Restaurants</p>
          <label>Address:&nbsp;&nbsp;</label>
          <input type="text" id="searchLocation" size="50" name="searchLocation" value={this.state.searchLocation}
                  onChange={this.handleChange}/>
          &nbsp;&nbsp;
          <button type="button"  onClick={() => this.props.handleSearch(this.state.searchLocation)}>Search</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a id="Favorites" onClick={(e) => this.props.updateFormDisplay("Favorites")}>My Favorites</a>
          
      </div>
      <div id="results">
        <ul>
        {this.props.searchResults.map((result) =>
          <li key={result.rownumber}>{result.name} {result.latitude} {result.longitude}</li>
        )}
        </ul>
      </div>
      <div className={this.props.searchResults.length > 0 ? '' : 'hide-component'}>
        <RestaurantMap submittedSearchAddress={this.props.submittedSearchAddress}
        mapAttributes={this.props.mapAttributes} />
      </div>
    </div>
  );
  }
}

export default SearchRestaurants;
