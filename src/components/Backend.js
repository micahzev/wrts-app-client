import React, { Component } from 'react';
import {  withRouter } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import decode from 'jwt-decode';
import EditSpace from './EditSpace';

import fetch from './fetch';

import { fetchSpaces } from '~/src/actions/spaces';
import { fetchEvents } from '~/src/actions/events';

import EditableEvents from './EditableEvents';
import '../styles/backend.css';


class Backend extends Component {

  constructor(props) {
    super(props);

  }

  findRelevantSpace(){

    const userSpaceId = decode(this.props.userToken)['custom:spaceId'];

    const userSpaceObject = this.props.spaces.length >0 ? this.props.spaces.find((x) => x.spaceId == userSpaceId) : {spaceName:'Loading...', spaceAddress:'Loading...', spaceUrl:'Loading...'};

    const spaceIndex = this.props.spaces.length >0 ? this.props.spaces.findIndex((x) => x.spaceId == userSpaceId) : -1;

    userSpaceObject.index = spaceIndex;

    return userSpaceObject;


  }

  attachedIndeces(relevantEvents){
    relevantEvents.forEach((relevantEvent) => {
      relevantEvent.index = this.props.events.findIndex((obj) => obj == relevantEvent);
    }


    )

    return relevantEvents;
  }


  render() {

    const thisSpace = (this.findRelevantSpace.bind(this))();

    const relevantEvents = this.props.events.filter((event) => event.spaceId == thisSpace.spaceId);

    const updatedRelevantEvents = (this.attachedIndeces.bind(this))(relevantEvents);

    return (
      <div className="Backend">
        <h1>
          WRTS BACKEND - {thisSpace.spaceName}
        </h1>
        <br/>
        <EditSpace space={thisSpace}/>
        <br/>
        <EditableEvents space={thisSpace} events={relevantEvents} />

      </div>
    );
  }

}
const FetchedBackend = fetch(Backend, {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FetchedBackend));
