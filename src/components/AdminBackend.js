import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

const AdminBackend = (props) => (
  <div className="Backend">
    <h1>{'WRTS BACKEND (ADMINISTRATOR ONLY)'}</h1>
    <br/>
    <EditableSpaces
      events={props.events}
      spaces={props.spaces}
    />
    <br/>
    <EditableText text={props.text} />
    <br/>
    <UserSignup spaces={props.spaces} />
  </div>
)

AdminBackend.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  spaces: PropTypes.arrayOf(PropTypes.objecy).isRequired,
  text:PropTypes.string.isRequired
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
