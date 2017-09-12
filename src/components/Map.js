import React, { Component } from 'react';
import _  from 'lodash';

import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

import '../styles/map.css';

import mapStyle from '../constants/mapStyle';

import mapMarkerCross from '../assets/cross.png';
import mapMarkerCircle from '../assets/circle.png';

const SimpleMapExampleGoogleMap = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: 48.855924, lng: 2.34532 }}
    defaultOptions={{
      styles: mapStyle,
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: true,
      rotateControl: false,
      fullscreenControl: false
    }}
    disableDefaultUI>
  {props.markers.map(marker => (
      <Marker
        {...marker}
      />
    ))}
  </GoogleMap>
));


class Map extends Component {
  constructor(props){
    super(props);
  }

  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  render() {

    const vernissageIds = this.props.events.filter((event) => {
      const today = new Date();
      const splitted = event.eventStartDate.split('-');
      const vernissage = new Date(event.eventStartDate.split('-').reverse().join('-'));
      return this.sameDay(today,vernissage);
    }).map((o) => {
      return o.spaceId;
    }
  );

    const markers = this.props.spaces ? this.props.spaces.map(function(space) {

      if (_.includes(vernissageIds, space.spaceId)) {
        return {
                position: {
                  lat: parseFloat(space.spaceLat),
                  lng: parseFloat(space.spaceLong),
                },
                key: space.spaceName,
                icon:mapMarkerCircle
              }
      } else {
        return {
                position: {
                  lat: parseFloat(space.spaceLat),
                  lng: parseFloat(space.spaceLong),
                },
                key: space.spaceName,
                icon:mapMarkerCross
              }
      }


    }) : [];

    return (
      <SimpleMapExampleGoogleMap

        className="Map"

        markers={markers}

        containerElement={
          <div className="mapElement" />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
      />
    );
  }
}

export default Map;
