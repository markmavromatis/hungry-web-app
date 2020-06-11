import React, {Component} from 'react';
import '../css/App.css';

class LoginUser extends Component {
 
  render() {

    return (
      <div className={this.props.formDisplay ? '' : 'hide-component'}>
          <p>Login User</p>
      </div>
    );
  }
}

export default LoginUser;
