import React, {Component} from 'react';
import '../css/App.css';

class SearchRestaurants extends Component {

  constructor(props) {
    super(props);
  }

  render() {
  return (
      <div key={this.props.searchResults}>
      <div id="criteria" className={this.props.formDisplay ? '' : 'hide-component'}>
        <p>Search Restaurants</p>
          <label>Address:&nbsp;&nbsp;</label>
          <input type="text" id="searchLocation" size="50" name="searchLocation"/>
          &nbsp;&nbsp;
          <button type="button"  onClick={this.props.handleSearch}>Search</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a id="Favorites" onClick={(e) => this.props.updateFormDisplay("Favorites")}>My Favorites</a>
          
      </div>
      <div id="results">
        <ul>
        {this.props.searchResults.map((result) =>
          <li key={result.rownumber}>{result.name} {result.latitude} {result.longitude}</li>
        )}
        </ul>
        {this.props.searchResults.length}
      </div>

    </div>
  );
  }
}

export default SearchRestaurants;
