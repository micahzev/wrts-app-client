import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Grid, Row, Col } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Map from './components/Map';
import Agenda from './components/Agenda';
import Spaces from './components/Spaces';

import Maphead from './components/Maphead';
import Agendahead from './components/Agendahead';
import Spaceshead from './components/Spaceshead';
import fetch from '~/src/components/fetch';

import { fetchSpaces } from '~/src/actions/spaces';
import { fetchEvents } from '~/src/actions/events';


class App extends Component {
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

const FetchedData = fetch(App, {
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

export default connect(mapStateToProps, mapDispatchToProps)(FetchedData);
