import React, { Component } from 'react';
import _  from 'lodash';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import '../styles/map.css';

import mapStyle from '../constants/mapStyle';

import mapMarker from '../assets/circle_pin.png';

const SimpleMapExampleGoogleMap = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 48.855924, lng: 2.34532 }}
    defaultOptions={{ styles: mapStyle }}
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

  render() {

    const markers = this.props.spaces ? this.props.spaces.map(function(space) {
      return {
              position: {
                lat: parseFloat(space.spaceLat),
                lng: parseFloat(space.spaceLong),
              },
              key: space.spaceName,
              icon:mapMarker
            }
    }) : [];

    return (
      <SimpleMapExampleGoogleMap

        className="Map"

        markers={markers}

        containerElement={
          <div style={{ height: '100%' }} />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
      />
    );
  }
}

export default Map;
