import React, {Component} from 'react';
import '../css/App.css';
import ReactMapGL, {Marker} from 'react-map-gl';

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

    // Create the Markers
    const restaurantMarkers = []
    let i = 0;
    this.props.searchResults.forEach((eachRestaurant) => {
      i += 1;
      restaurantMarkers.push(<Marker key={i} latitude={eachRestaurant.latitude} longitude={eachRestaurant.longitude}><div><img src="logo192.png"/><a href={eachRestaurant.url}>{eachRestaurant.name}</a></div></Marker>)
    })

    console.log("Latitude " + this.props.viewport.longitude + " " + this.props.viewport.latitude)
    return (
      <div key={this.props.searchResults}>
      <div id="criteria" className={this.props.formDisplay === "Favorites" || this.props.formDisplay == "SearchRestaurants" ? '' : 'hide-component'}>
        {/* <button type="button" onClick={() => this.props.logoutUser()}>Logout</button> */}
        <p className="title">Search Restaurants</p>
          <label>Address:&nbsp;&nbsp;</label>
          <input type="text" id="searchLocation" size="50" name="searchLocation" value={this.state.searchLocation}
                  onChange={this.handleChange}/>
          &nbsp;&nbsp;
          <button className = "blue_button" type="button"  onClick={() => this.props.handleSearch(this.state.searchLocation)}>Search</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className={this.props.formDisplay != "Favorites" ? '' : 'hide-component'}>
          <a id="Favorites" onClick={(e) => this.props.updateFormDisplay("Favorites")}>My Favorites</a>
          </div>
      </div>
      <div className={this.props.formDisplay == "SearchRestaurants" ? '' : 'hide-component'}>
      <ReactMapGL 
        {...this.props.viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWFya21hdnJvbWF0aXMiLCJhIjoiY2tiYXN2amNvMG1yYTJxbzRscnhqOXpoeCJ9.wnVVLpKx-JulTuNBck5RGw">
          <Marker latitude={this.props.viewport.latitude} longitude={this.props.viewport.longitude}>
          <img src="logo192.png"/>
          <div>OISHII^2!</div></Marker>
          {restaurantMarkers}
        </ReactMapGL>
            </div>
    </div>
  );
  }
}

export default SearchRestaurants;
