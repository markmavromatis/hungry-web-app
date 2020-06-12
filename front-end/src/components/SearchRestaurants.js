import React, {Component} from 'react';
import '../css/App.css';
import ReactMapGL from 'react-map-gl';

class SearchRestaurants extends Component {

  constructor(props) {
    super(props)
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
      <div className={this.props.searchResults.length > 0 ? '' : 'hide-component'}>
      <ReactMapGL
        {...this.props.viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWFya21hdnJvbWF0aXMiLCJhIjoiY2tiYXN2amNvMG1yYTJxbzRscnhqOXpoeCJ9.wnVVLpKx-JulTuNBck5RGw"

      />
            </div>
    </div>
  );
  }
}

export default SearchRestaurants;
