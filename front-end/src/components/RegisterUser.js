import React, {Component} from 'react';
import '../css/App.css';

class RegisterUser extends Component {

    render() {
        return (
            <div className={this.props.formDisplay ? '' : 'hide-component'}>
                <p>Register User</p>
            </div>
        );
    }
}
export default RegisterUser;
