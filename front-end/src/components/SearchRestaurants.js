import React, {Component} from 'react';
import '../css/App.css';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {FaMapMarker} from 'react-icons/fa';
import {IoIosAt} from 'react-icons/io';

// This screen serves two purposes:
// 1) Search for restaurants near an address
// 2) View user's favorite restaurants
class SearchRestaurants extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchLocation: "",
      selectedRestaurant: null
    };
    this.handleChange = this.handleChange.bind(this);
  }


  
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  closePopup = () => {
    this.setState({
      selectedHotspot: null
    }); 
  };

    
  render() {

  
    // For the Search Restaurants screen:
    // Create a map marker for each (restaurant) search result
    const restaurantMarkers = []
    let i = 0;
    this.props.searchResults.forEach((eachRestaurant) => {
      i += 1;
      restaurantMarkers.push(
        <Marker key={i} latitude={eachRestaurant.latitude} longitude={eachRestaurant.longitude}>
          <div>
            <FaMapMarker onClick={() => {
              this.setState({selectedRestaurant: eachRestaurant});
            }}/>
          </div></Marker>
      )
      
    })

    // For the Favorites screen:
    // Create a list of favorite restaurants to be displayed
    const favoritesList = [];

    let favoriteCounter = 0;
    this.props.favorites.forEach((eachFavorite) => {
      favoriteCounter += 1;
      favoritesList.push(
        <div key={eachFavorite.name + favoriteCounter}>
        <a target="_blank" rel="noopener noreferrer" href={eachFavorite.url}>
          <label className="favorite_restaurant_name">{eachFavorite.name}</label>
          </a><br/>
        {eachFavorite.address1}, {eachFavorite.city}, {eachFavorite.state} {eachFavorite.zip}<br/>&nbsp;<br></br>
        </div>
      )
    })
    
    return (

      <div key={this.props.searchResults}>
      {/* Search Restaurants control: Address Box, Search Button, View Favorites Button, Clear Favorites Button */}
      <div id="criteria" className={this.props.formDisplay === "Favorites" || this.props.formDisplay === "SearchRestaurants" ? '' : 'hide-component'}>
        <div className = "logoutDiv">
          <button className = "blue_button logoutButton" type="button"  onClick={() => this.props.logoutUser()}>Logout</button><br/>
        </div>
        <p className="title">Search Restaurants</p>
        <div><label>Address:&nbsp;&nbsp;</label>
          <input type="text" id="searchLocation" size="50" name="searchLocation" value={this.state.searchLocation}
                  onChange={this.handleChange}/>
          &nbsp;&nbsp;
          <button className = "blue_button" type="button"  onClick={() => this.props.handleSearch(this.state.searchLocation)}>Search</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className={this.props.formDisplay !== "Favorites" ? '' : 'hide-component'} id="Favorites" onClick={(e) => this.props.handleGetFavorites()}>My Favorites</button>
          <button className={this.props.formDisplay === "Favorites" && this.props.favorites.length > 0 ? '' : 'hide-component'} id="Favorites" onClick={() => this.props.handleDeleteFavorites()}>Clear My Favorites</button>
        </div>
      </div>
      <div className={this.props.formDisplay !== "Favorites" ? '' : 'hide-compnent'}>
      <ReactMapGL
        {...this.props.viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.REACT_APP_HUNGRY_MAPBOX_TOKEN}>
          <Marker latitude={this.props.viewport.latitude} longitude={this.props.viewport.longitude}>
          <IoIosAt />
          <div>Home</div></Marker>
          {restaurantMarkers}

          {/* Draw a popup on the selected restaurant (if any selected) */}
          {this.state.selectedRestaurant !== null ? (
            <Popup className="popup"
              latitude={parseFloat(this.state.selectedRestaurant.latitude)}
              longitude={parseFloat(this.state.selectedRestaurant.longitude)}
              onClose={this.closePopup}>
              <div>
                <p className="popup_restaurant_name">
                  <a rel="noopener noreferrer" target="_blank" href={this.state.selectedRestaurant.url}>
                    {this.state.selectedRestaurant.name}</a>
                </p>
                <p className="popup_restaurant_address">
                  {this.state.selectedRestaurant.address1}<br/>
                  {this.state.selectedRestaurant.city},&nbsp;
                  {this.state.selectedRestaurant.state}&nbsp;
                  {this.state.selectedRestaurant.zip}<br/>
                  <button className="blue_button" onClick={() => this.props.handleAddFavorite(this.state.selectedRestaurant)}>ADD FAVORITE</button>
                </p>
              </div>
            </Popup>
          ) : null}
      </ReactMapGL>
      </div>
      {/* Favorites List (for View Favorites screen) */}
      <div className={this.props.formDisplay === "Favorites" ? '' : 'hide-component'}>
        <p className="my-favorites-title">Favorite Restaurants</p>
        {favoritesList}        
      </div>


  </div>
)}
}

export default SearchRestaurants;
