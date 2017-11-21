import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import LoaderButton from './LoaderButton';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';

import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import config from '../config.js';

import '../styles/backend.css';


class UserSignup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: '',
      password: '',
      space:'-----',
      newUser:null
    };

  }

  validateForm() {
    return this.state.username.length > 0
        && this.state.password.length > 0
        && this.state.space != '-----';
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  submitAndConfirm(event) {
    event.preventDefault();
    this.setState({ isLoading: true });

    if (this.state.space == 'admin') {
      confirmAlert({
        title: 'Confirm to add user!',                        // Title dialog
        message: 'Are you sure to add an administrator user? (this user will be able to add other users and edit all spaces)',
        confirmLabel: 'Confirm',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => this.handleSubmit(event),    // Action after Confirm
        onCancel: () => this.resetToNormal(),      // Action after Cancel
      });
    } else {
      this.handleSubmit(event);
    }


  };

  resetToNormal(){
    this.setState({
      newUser: null,
      isLoading: false,
      username: '',
      password: '',
      space:'-----',

    });
  }


  async handleSubmit(event) {
    event.preventDefault();

    try {
      const newUser = await this.signup(this.state.username, this.state.password, this.state.space);
      this.setState({
        newUser: null,
        isLoading: false,
        username: '',
        password: '',
        space:'-----',

      });

      alert('Signup Successful');
    }
    catch(e) {
      alert(e);
    }


    this.setState({ isLoading: false });
  }

  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) => (
      user.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    ));
  }


  signup(username, password, spaceId) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const attributeEmail = new CognitoUserAttribute({ Name : 'email', Value : username });
    const attributeSpaceId = new CognitoUserAttribute({ Name: 'custom:spaceId' , Value: spaceId });

    return new Promise((resolve, reject) => (
      userPool.signUp(username, password, [attributeEmail,attributeSpaceId], null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result.user);
      })
    ));
  }

  async handleConfirmationSubmit(event) {
    event.preventDefault();

    this.setState({ isLoading: true });
  }




  render() {

    const spaces = this.props.spaces;

    return (
      <div className="Signup">
        <h2>
        Sign Up New Users
        </h2>
        <form onSubmit={this.submitAndConfirm.bind(this)}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl

              value={this.state.username}
              onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
            />
          </FormGroup>
          <FormGroup controlId="space">
            <ControlLabel>Select A Space to Link with this User</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.space} onChange={this.handleChange.bind(this)}>
              <option key="none">-----</option>
              {spaces.map((item, index) => (
                <option key={item.spaceId} value={item.spaceId}>{item.spaceName}</option>
              ))}
              <option value={'admin'}>Admin User</option>
            </FormControl>
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={! this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Signup"
            loadingText="Signing up…" />
        </form>

      </div>
    );
  }

}

export default UserSignup;
