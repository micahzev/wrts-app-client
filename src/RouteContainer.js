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


class RouteContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router basename="/">
        <App>

              <Route exact path="/" component={Layout} />

              <Route path="/login" component={Login}/>



        </App>
      </Router>
    );
  }
}


export default RouteContainer;
