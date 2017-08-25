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
    return (
      <div className="App">
        <Grid className="Grid">
          <Row>
            <Col xs={4} md={4} className="Header" >
              <Maphead />
            </Col>
            <Col xs={4} md={4} className="Header" >
              <Agendahead />
            </Col>
            <Col xs={4} md={4} className="Header" >
              <Spaceshead />
            </Col>
          </Row>
          <Row className="Row">
            <Col xs={12} md={4} className="Column" >
              <Map />
            </Col>
            <Col xs={12} md={4} className="Column" >
              <Agenda events={this.props.events} spaces={this.props.spaces} />
            </Col>
            <Col xs={12} md={4} className="Column spacescolumn" >
              <Spaces spaces={this.props.spaces} />
            </Col>
          </Row>
        </Grid>
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
