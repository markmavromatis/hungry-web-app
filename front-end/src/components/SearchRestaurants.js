import React, {Component} from 'react';
import '../css/App.css';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {FaMapMarker} from 'react-icons/fa';

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
    // console.log("Name: " + name + " \tValue = " + value)

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

  
    // Create the Markers
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
          </div></Marker>)
      
    })

    const favoritesList = [];

    let favoriteCounter = 0;
    this.props.favorites.forEach((eachFavorite) => {
      favoriteCounter += 1;
      favoritesList.push(
        <p key={"favorite" + favoriteCounter}>Name: {eachFavorite.name}<br/>
        {eachFavorite.address1}, {eachFavorite.city}, {eachFavorite.state} {eachFavorite.zip}<br/>&nbsp;<br></br></p>
      )
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
          <a className={this.props.formDisplay != "Favorites" ? '' : 'hide-component'} id="Favorites" onClick={(e) => this.props.handleGetFavorites()}>My Favorites</a>
          <a className={this.props.formDisplay == "Favorites" && this.props.favorites.length > 0 ? '' : 'hide-component'} id="Favorites" onClick={() => this.props.handleDeleteFavorites()}>Clear My Favorites</a>

      </div>
      <div className={this.props.formDisplay == "Favorites" ? '' : 'hide-component'}>
        <p className="my-favorites-title">Favorite Restaurants</p>
        {favoritesList}        
      </div>
      <div className={this.props.searchResults.length > 0 && this.props.formDisplay == "SearchRestaurants" ? '' : 'hide-component'}>
      <ReactMapGL 
        {...this.props.viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWFya21hdnJvbWF0aXMiLCJhIjoiY2tiYXN2amNvMG1yYTJxbzRscnhqOXpoeCJ9.wnVVLpKx-JulTuNBck5RGw">
          <Marker latitude={this.props.viewport.latitude} longitude={this.props.viewport.longitude}>
          <img src="logo192.png"/>
          <div>Home</div></Marker>
          {restaurantMarkers}
          {this.state.selectedRestaurant !== null ? (
        <Popup className="popup"
          latitude={parseFloat(this.state.selectedRestaurant.latitude)}
          longitude={parseFloat(this.state.selectedRestaurant.longitude)}
          onClose={this.closePopup}
        ><div>
                    <p className="popup_restaurant_name">
                      <a target="_blank" href={this.state.selectedRestaurant.url}>
                        {this.state.selectedRestaurant.name}</a>
                    </p>
                    <p className="popup_restaurant_address">
                      {this.state.selectedRestaurant.address1}<br/>
                      {this.state.selectedRestaurant.city},
                      {this.state.selectedRestaurant.state}
                      {this.state.selectedRestaurant.zip}<br/>
                      <a className="blue_button" onClick={() => this.props.handleAddFavorite(this.state.selectedRestaurant)}>ADD FAVORITE</a>
                      </p>
                      </div></Popup>
        ) : null}

        </ReactMapGL>
            </div>
    </div>
  );
  }
}

export default SearchRestaurants;
