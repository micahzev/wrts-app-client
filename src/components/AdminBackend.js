import React, { Component } from 'react';
import {  withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditableSpaces from './EditableSpaces';
import UserSignup from './UserSignup';

import {
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import fetch from './fetch';

import { fetchSpaces } from '~/src/actions/spaces';
import { fetchEvents } from '~/src/actions/events';

import '../styles/backend.css';


class AdminBackend extends Component {

  constructor(props) {
    super(props);

  }



  render() {




    return (
      <div className="Backend">
        <h1>
        WRTS BACKEND (ADMINISTRATOR ONLY)
        </h1>
        <br/>
        <EditableSpaces spaces={this.props.spaces} />
        <br/>
        <UserSignup spaces={this.props.spaces} />
      </div>
    );
  }

}


const FetchedAdminBackend = fetch(AdminBackend, {
  actions: [fetchSpaces, fetchEvents]
});


function mapStateToProps(state) {
  const spaces = state.spaces;
  const events = state.events;
  return {
    spaces,
    events
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchSpaces: bindActionCreators(fetchSpaces, dispatch),
    fetchEvents: bindActionCreators(fetchEvents, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FetchedAdminBackend));
