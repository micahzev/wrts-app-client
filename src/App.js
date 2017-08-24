import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Grid, Row, Col } from 'react-bootstrap';

import Map from './components/Map';
import Agenda from './components/Agenda';
import Spaces from './components/Spaces';

import Maphead from './components/Maphead';
import Agendahead from './components/Agendahead';
import Spaceshead from './components/Spaceshead';


class App extends Component {
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
              <Agenda />
            </Col>
            <Col xs={12} md={4} className="Column" >
              <Spaces />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
