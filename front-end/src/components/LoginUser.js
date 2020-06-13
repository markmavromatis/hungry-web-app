import React, {Component} from 'react';
import logo from './hungryHippo.png'
import '../css/App.css';

// User Login Page
class LoginUser extends Component {
 
  render() {

    return (
      <div align="left" className={this.props.formDisplay ? '' : 'hide-component'}>
          <img alt="Hungry Hippo" className="hippo_image" src={logo} width="500" height="600"/>
          <label className="title">Are you feeling hungry?</label>
          <label className="login">UserID:</label><input id="UserID" type="text"/><br/>
          <label className="login">Password: </label><input id="Password" type="password"/><br/>
          <button className="blue_button" type="button" onClick={() => this.props.validateUser(document.getElementById("UserID").value, document.getElementById("Password").value)}>Sign In</button>
          <p><label className="register"> No account? No problem. <a className="register popup_restaurant_name" href="">Register here</a></label></p>
      </div>
    );
  }
}

export default LoginUser;
