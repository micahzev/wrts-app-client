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

import '../styles/login.css';


class Login extends Component {

  constructor(props) {
    super(props);
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

  handleSubmit(event) {
    event.preventDefault();
  }


  render() {
    return (
      <div className="Login">

        <form onSubmit={this.handleSubmit}>
        <h1>
        Login to WRTS
        </h1>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.username}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password" />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={ ! this.validateForm() }
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
