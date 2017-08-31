import React, { Component } from 'react';

import '../App.css';

import { Grid, Row, Col } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';

import Map from './Map';
import Agenda from './Agenda';
import Spaces from './Spaces';

import Maphead from './Maphead';
import Agendahead from './Agendahead';
import Spaceshead from './Spaceshead';
import fetch from './fetch';

import { fetchSpaces } from '~/src/actions/spaces';
import { fetchEvents } from '~/src/actions/events';


class Layout extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    var agendaSpecialStyle = {
          padding:0,
        };

    return (
      <div className="App">
            <div  className="ColumnChild" >
                  <div className="HeaderChild" >
                      <Maphead />
                  </div>
                  <Map className="ComponentChild" spaces={this.props.spaces} />
            </div>
            <div style={agendaSpecialStyle} className="ColumnChild" >
                  <div className="HeaderChildMiddle" >
                      <Agendahead />
                  </div>
                  <Agenda className="ComponentChildAgenda" events={this.props.events} spaces={this.props.spaces} />
            </div>
            <div className="ColumnChild" >
                  <div className="HeaderChild" >
                      <Spaceshead  />
                  </div>
                  <Spaces className="ComponentChildSpaces" spaces={this.props.spaces} events={this.props.events}/>
            </div>
      </div>
    );
  }
}

const FetchedData = fetch(Layout, {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FetchedData));
