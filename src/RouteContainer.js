import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, browserHistory, IndexRoute, Redirect, Switch, withRouter } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBrowserHistory } from 'history';

import App from './App';
import Login from './components/Login';
import Layout from  './components/Layout';
import Backend from './components/Backend';
import AdminBackend from './components/AdminBackend';
import AppliedRoute from './components/AppliedRoute';

import {requireAuthentication} from './components/AuthenticatedComponentBackend';
import {requireAuthenticationAdmin} from './components/AuthenticatedComponentAdmin';

class RouteContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
    }
  }

  updateUserToken(userToken) {
    this.setState({
      userToken: userToken
    });
  }

  render() {
    const childProps = {
      userToken: this.state.userToken,
      updateUserToken: this.updateUserToken.bind(this),
    };

    return (
      <Router basename="/">
        <App>
          <Route exact path="/" component={Layout} />
          <AppliedRoute path="/login" component={Login} props={childProps}/>
          <AppliedRoute path="/backend" component={requireAuthentication(Backend)} props={childProps}/>
          <AppliedRoute path="/admin-backend" component={requireAuthenticationAdmin(AdminBackend)} props={childProps}/>
        </App>
      </Router>
    );
  }
}

export default RouteContainer;
