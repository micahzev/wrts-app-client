import React, { Component } from 'react';
import {  withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditableSpaces from './EditableSpaces';
import EditableText from './EditableText';
import UserSignup from './UserSignup';

import {
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import fetch from './fetch';

import { fetchSpaces } from '~/src/actions/spaces';
import { fetchEvents } from '~/src/actions/events';
import { fetchText } from '~/src/actions/text';

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
        <EditableSpaces spaces={this.props.spaces} events={this.props.events} />
        <br/>
        <EditableText text={this.props.text} />
        <br/>
        <UserSignup spaces={this.props.spaces} />
      </div>
    );
  }

}


const FetchedAdminBackend = fetch(AdminBackend, {
  actions: [fetchSpaces, fetchEvents, fetchText]
});


function mapStateToProps(state) {
  const spaces = state.spaces;
  const events = state.events;
  const text = state.text;
  return {
    spaces,
    events,
    text
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchSpaces: bindActionCreators(fetchSpaces, dispatch),
    fetchEvents: bindActionCreators(fetchEvents, dispatch),
    fetchText: bindActionCreators(fetchText, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FetchedAdminBackend));
