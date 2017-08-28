import React, { Component } from 'react';
import {  withRouter } from 'react-router';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

import config from '../config.js';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';

import decode from 'jwt-decode';

import '../styles/login.css';


class Login extends Component {

  constructor(props) {
    super(props);
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
    this.validateForm.bind(this);
    this.state = {
      username: '',
      password: '',
    };
  }

  validateForm() {
    return this.state.username.length > 0
      && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      const userToken = await this.login(this.state.username, this.state.password);
      this.props.updateUserToken(userToken);
      const testAdmin = decode(userToken);
      if ( testAdmin['custom:spaceId'] == 'admin'){
        this.props.history.push('/admin-backend');
      } else {
        this.props.history.push('/backend');
      }

    }
    catch(e) {
      console.log(e);
    }
  }

  login(username, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const authenticationData = {
      Username: username,
      Password: password
    };

    const user = new CognitoUser({ Username: username, Pool: userPool });
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => (
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
        onFailure: (err) => reject(err),
      })
    ));
  }


  render() {
    return (
      <div className="Login">

        <form onSubmit={this.handleSubmit.bind(this)}>
          <h1>
        Login to WRTS
          </h1>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.username}
              onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
              type="password" />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={! (this.validateForm.bind(this))()}
            type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }

}

export default withRouter(Login);
///////////////////////////////////////////////////
