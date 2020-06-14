import React, {Component} from 'react';
import logo from './hungryHippo.png'
import '../css/App.css';

// User Login Page
class LoginUser extends Component {

  constructor() {
    super();
    this.state = {
      loginError: "",
      hostApi: process.env.REACT_APP_HUNGRY_REST_API_HOST + ":" + process.env.REACT_APP_HUNGRY_REST_API_PORT
    };

  }
  
  render() {


    return (
      <div align="left" className={this.props.formDisplay === "LoginUser" ? '' : 'hide-component'}>
          <img alt="Hungry Hippo" className="hippo_image" src={logo} width="500" height="600"/>
          <label className="title">Are you feeling hungry?</label>
          <label className="login">UserID:</label><input id="UserID" type="text"/><br/>
          <label className="login">Password: </label><input id="Password" type="password"/><br/>
          <button className="blue_button" type="button" onClick={() => this.props.validateUser(document)}>Sign In</button>
          <div className="loginError {this.props.loginError ? '' : 'hide-component'}"><p>{this.props.loginError}</p></div>
          <p><label className="register"> No account? No problem. <button className="register registerLink" onClick={() => this.props.handleNavigateToRegisterPage(document)}>Register here</button></label></p>
      </div>
    );
  }
}

export default LoginUser;
