import React, {Component} from 'react';
import '../css/App.css';
import SearchRestaurants from './SearchRestaurants';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';
import mapboxgl from "mapbox-gl"
import * as jwt from 'jsonwebtoken';
import ls from 'local-storage'
import * as EmailValidator from 'email-validator';


class App extends Component {


  constructor() {
    super();
    this.state = {
      loginError: null,
      registerUserError: null,
      registerUserStatus: null,
      formDisplay: "LoginUser",
      searchResults: [],
      favorites: [],
      submittedSearchAddress: "",
      viewport: {
        latitude : 0,
        longitude: 0,
        width: 0,
        height: 0,
        zoom: 12
      },
      userInfo: null,
      hostApi: process.env.REACT_APP_HUNGRY_REST_API_HOST + ":" + process.env.REACT_APP_HUNGRY_REST_API_PORT
    }

  
    this.updateFormDisplay = this.updateFormDisplay.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleGetFavorites = this.handleGetFavorites.bind(this);
    this.handleAddFavorite = this.handleAddFavorite.bind(this);
    this.handleDeleteFavorites = this.handleDeleteFavorites.bind(this);
    this.handleNavigateToLoginPage = this.handleNavigateToLoginPage.bind(this);
    this.handleNavigateToRegisterPage = this.handleNavigateToRegisterPage.bind(this);
    this.handleRegisterUser = this.handleRegisterUser.bind(this);

    // this.getAuthorizationHeader = this.getAuthorizationHeader(this);
  }

  getAuthorizationHeader() {
    const token = ls.get("RESTAPI_TOKEN");
    return {'Authorization': 'Bearer ' + token}
  }

  // Delete all user favorites 
  handleDeleteFavorites() {
    const headers = this.getAuthorizationHeader();
    headers['Content-Type'] = 'application/json';
    const bodyText = JSON.stringify({email: this.state.userInfo.email})
    const url = `http://${this.state.hostApi}/api/v0/favorites`
    fetch(url, {method: 'DELETE', headers: headers,
        body: bodyText}
      )
    .then(res => {
      if (res.status === 200) {
        // Refresh the favorites
        this.setState({favorites : []})      
        // return
      } else {
        throw "FAILED TO DELETE FAVORITES" + res.json()
      }
    })

  }

  // Add a new favorite restaurant
  handleAddFavorite(restaurant) {

    const bodyText = JSON.stringify({
      email: this.state.userInfo.email, 
      restaurantId: restaurant.restaurantId,
      name: restaurant.name,
      url: restaurant.url,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      address1: restaurant.address1,
      city: restaurant.city,
      state: restaurant.state,
      zip: restaurant.zip});

    const headers = this.getAuthorizationHeader()
    headers['Content-Type'] = 'application/json';

    fetch(`http://${this.state.hostApi}/api/v0/favorites`, {method: 'POST',
      headers: headers,
      body: bodyText
    })
    .then(res => {
      // For this service, 200 if duplicate record exists, 201 if added.
      if (res.status === 200 || res.status === 201) {
        this.setState({formDisplay: "SearchRestaurants"})
        // return res.json()
      } else {
        console.error(bodyText)
        throw "FAILED TO ADD FAVORITE. Status = " + res.status
      }
    }
    )
    .catch(e => {
      console.error(e)
    })

  }



  logoutUser() {
    this.setState({
      userInfo: null,
      submittedSearchAddress: null,
      formDisplay: "LoginUser"
    });
    ls.set("RESTAPI_TOKEN", null)
  }

  updateFormDisplay(e) {
    this.setState({formDisplay: e})
  }

  // Retrieve user's favorite restaurants
  handleGetFavorites(e) {

    const authHeader = this.getAuthorizationHeader();

    this.setState({formDisplay: "Favorites"});
    fetch(`http://${this.state.hostApi}/api/v0/favorites/` + this.state.userInfo.email
        , {headers: authHeader})
    .then(res => res.json())
    .then((data) => {
      this.setState({favorites : data})
    })
  }

  // Search Yelp for nearby restaurants
  handleSearch(e) {

    const authHeader = this.getAuthorizationHeader();
    if (!e) {
      // Nothing to search
      return false;
    }
    this.setState({formDisplay: "SearchRestaurants"});
    this.setState({submittedSearchAddress: e});

    // Identify longitude / latitude of the search address
    // for centering the map.
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + e + ".json?access_token=" + mapboxgl.accessToken)
    .then(res => res.json())
    .then((data) => {

      const center = data.features[0].center;
      this.setState({mapAttributes: {centerLongitude: center[0], centerLatitude: center[1]}});
    })
    .then(() => {
      // After geocoding, Search Yelp for nearby restaurants
      fetch(`http://${this.state.hostApi}/api/v0/restaurants?distanceInMiles=5&address=` + e, 
          {headers: authHeader})      
        .then(res => res.json())
        .then((data) => {

        const restaurantsArray = []
        let i = 0;
        data.forEach(row => {
          i += 1
          restaurantsArray.push({"rownumber": i, "restaurantId": row.id, "name": row.name, "url": row.url, 
              "longitude": row.coordinates.longitude, "latitude": row.coordinates.latitude,
              "address1": row.location.address1, "city": row.location.city,
              "state": row.location.state, "zip": row.location.zip_code})

        })
        this.setState({viewport: {longitude: this.state.mapAttributes.centerLongitude, latitude: this.state.mapAttributes.centerLatitude, width: 600, height: 400, zoom: 12}})
        this.setState({searchResults: restaurantsArray});
      }).catch((e) => console.error(e))
    .catch((e) => console.error(e))
    })

  };

    // Validate user credentials (userID and password)
    validateUser(document) {

      const userId = document.getElementById("UserID").value
      const password = document.getElementById("Password").value
      
      // Don't validate credentials if either userid or password are missing.
      if (!userId || !password) {        
        return
      }
      const bodyText = JSON.stringify({email: userId, password: password});
  
      fetch(`http://${this.state.hostApi}/api/v0/users/auth/login`, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: bodyText
      })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw "INVALID"
        }
      }
      )
      .then(data => {
        ls.set("RESTAPI_TOKEN", data.token);
        this.setState({
          userInfo: jwt.decode(data.token),
          formDisplay: "SearchRestaurants",
          loginError: null
        })

        // Clear login fields
        document.getElementById("UserID").value = null;
        document.getElementById("Password").value = null;
  
      })
      .catch(e => {
        this.setState({loginError: "Unable to sign in. Please check your password and try again"})
      })
    }

    handleNavigateToLoginPage(document) {
      document.getElementById("RegisterUserID").value = null;
      document.getElementById("RegisterPassword").value = null;
      document.getElementById("RegisterPasswordConfirm").value = null;
      this.setState({formDisplay: "LoginUser"});
    }

    handleNavigateToRegisterPage(document) {
      document.getElementById("UserID").value = null;
      document.getElementById("Password").value = null;
      this.setState({formDisplay: "RegisterUser"});
    }
  
    handleRegisterUser(document) {
      console.log("Inside method handleRegisterUser...")
      const email = document.getElementById("RegisterUserID").value;
      const password = document.getElementById("RegisterPassword").value;
      const passwordConfirm = document.getElementById("RegisterPasswordConfirm").value;
      const fullName = document.getElementById("RegisterFullName").value;

      if (email == "") {
        this.setState({registerUserError: "Email is a required field!"});      
        return
      }

      if (!EmailValidator.validate(email)) {
        this.setState({registerUserError: "Please enter a valid email address!"});      
        return
      }
      if (fullName == "") {
        this.setState({registerUserError: "Full Name is a required field!"});        
      }

      if (password == "") {
        this.setState({registerUserError: "Password is a required field!"});        
      }

      if (passwordConfirm == "") {
        this.setState({registerUserError: "Confirmed Password is a required field!"});        
      }

      if (password != passwordConfirm) {
        this.setState({registerUserError: "Password and Confirm Password fields do not match!"});
        return;
      }



      // Register user
      const headers = this.getAuthorizationHeader();
      headers['Content-Type'] = 'application/json';
      const bodyText = JSON.stringify({email: email, password: password, fullName: fullName});
      fetch(`http://${this.state.hostApi}/api/v0/users/auth/`, {method: 'POST',
      headers: headers,
      body: bodyText
    })
    .then(res => {
      // For this service, 201 if user registered.
      if (res.status === 201) {
        this.setState({registerUserError: null, registerUserStatus: "User " + email + " successfully registered!"})
        // return res.json()
      } else {
        console.error(bodyText)
        throw "FAILED TO ADD FAVORITE. Status = " + res.status
      }
    }
    )
    .catch(e => {
      console.error(e)
    })


    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <LoginUser formDisplay={this.state.formDisplay}
          validateUser={this.validateUser} loginError={this.state.loginError}
          handleNavigateToRegisterPage={this.handleNavigateToRegisterPage}/>
          <RegisterUser formDisplay={this.state.formDisplay === "RegisterUser"} 
              handleRegisterUser={this.handleRegisterUser}
              handleNavigateToLoginPage={this.handleNavigateToLoginPage}
              userRegistrationError = {this.state.registerUserError}
              registerUserStatus = {this.state.registerUserStatus}
              />
          <SearchRestaurants formDisplay={this.state.formDisplay}
              updateFormDisplay={this.updateFormDisplay} handleSearch={this.handleSearch}
              searchResults={this.state.searchResults} submittedSearchAddress={this.state.submittedSearchAddress}
              mapAttributes={this.state.mapAttributes}
              viewport={this.state.viewport} logoutUser={this.logoutUser}
              handleGetFavorites = {this.handleGetFavorites} favorites={this.state.favorites}
              handleAddFavorite = {this.handleAddFavorite} handleDeleteFavorites = {this.handleDeleteFavorites}
        />

        </header>
      </div>
    );
  }
}

export default App;
