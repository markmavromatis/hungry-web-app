import React, {Component} from 'react';
import '../css/App.css';

class LoginUser extends Component {
 
  render() {

    return (
      <div align="left" className={this.props.formDisplay ? '' : 'hide-component'}>
          <label className="title">Login</label>
          <label className="login">UserID:</label><input id="UserID" type="text"/><br/>
          <label className="login">Password: </label><input id="Password" type="password"/><br/>
          <button className="blue_button" type="button" onClick={() => this.props.validateUser(document.getElementById("UserID").value, document.getElementById("Password").value)}>Sign In</button>          
      </div>
    );
  }
}

export default LoginUser;
