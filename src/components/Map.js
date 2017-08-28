import React, { Component } from 'react';
import _  from 'lodash';

import { withGoogleMap, GoogleMap } from 'react-google-maps';

import '../styles/map.css';

import mapStyle from '../constants/mapStyle';

const SimpleMapExampleGoogleMap = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 48.855924, lng: 2.34532 }}
    defaultOptions={{ styles: mapStyle }}
    disableDefaultUI
  />
));


class Map extends Component {
  render() {
    return (
      <SimpleMapExampleGoogleMap

        className="Map"

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
