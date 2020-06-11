import React, {Component} from 'react';
import '../css/App.css';

class ViewFavorites extends Component {

  render() {
  return (
    <div className={this.props.formDisplay ? '' : 'hide-component'}>
      <p>View Favorites</p>
          <label>Address:&nbsp;&nbsp;</label>
          <input type="text" id="searchLocation" size="50" name="searchLocation"/>
          &nbsp;&nbsp;
          <button type="button"  onClick={this.handleSearch}>Search</button>
          <a id="Favorites" onClick={(e) => this.props.updateFormDisplay("SearchRestaurants")}>My Favorites</a>

    </div>
  );
}
}
export default ViewFavorites;
