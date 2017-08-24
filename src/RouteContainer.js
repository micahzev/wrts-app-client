import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBrowserHistory } from 'history';

import App from './App';

class RouteContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: syncHistoryWithStore(createBrowserHistory(), this.props.store)
    };
  }

  render() {
    return (
      <Router ref="router" history={this.state.history}>
        <Route path="/" component={App}>
        </Route>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(undefined, mapDispatchToProps)(RouteContainer);
