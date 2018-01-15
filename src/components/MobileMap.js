import React, { Component } from 'react';
import _  from 'lodash';

import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

import '../styles/map.css';

import mapStyle from '../constants/mapStyle';

import mapMarkerCross from '../assets/cross.png';
import mapMarkerCircle from '../assets/circle.png';

import Maphead from './Maphead';

import Map from './Map';

import { CSSTransitionGroup } from 'react-transition-group';

class MobileMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
    }
  }

  hideMe() {
    this.props.undoShow();
  }

  render() {

    return (
        <div className="MobileMapContainer">
          <div className="HeaderChildMapMobile" >
            <Maphead />
            <div className="mapCloseButton" onClick={this.hideMe.bind(this)}>
            </div>
          </div>
          <Map className="ComponentChildMapMobile" markerToShow={this.state.itemToShow} spaces={this.props.spaces} events={this.props.events}/>
        </div>
    );
  }
}

export default MobileMap;
