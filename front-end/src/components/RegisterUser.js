import React, {Component} from 'react';
import '../css/App.css';

// Register New User page (in development)
class RegisterUser extends Component {

    render() {
        return (
            <div className={this.props.formDisplay ? '' : 'hide-component'}>
                <p>Register User</p>
                <label className="login">Email Address:</label><input id="RegisterUserID" type="text"/><br/>
                <label className="login">Full Name:</label><input id="RegisterFullName" type="text"/><br/>
                <label className="login">Password: </label><input id="RegisterPassword" type="password"/><br/>
                <label className="login">Password (Again): </label><input id="RegisterPasswordConfirm" type="password"/><br/>
                <div className="loginError {this.props.userRegistrationError ? '' : 'hide-component'}"><p>{this.props.userRegistrationError}</p></div>
                <div className="{this.props.userRegistrationStatus ? '' : 'hide-component'}"><p>{this.props.userRegistrationStatus}</p></div>
                <button className="blue_button" type="button" onClick={() => this.props.handleRegisterUser(document)}>Register</button>
                <button className="blue_button" type="button" onClick={() => this.props.handleNavigateToLoginPage(document)}>Sign In</button>

            </div>
        );
    }
}
export default RegisterUser;
