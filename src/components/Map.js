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
    onClick={() => props.onMapClick()}
    disableDefaultUI>
  {props.markers.map(marker => (
      <Marker
        {...marker}
        onClick={() => props.onMarkerClick(marker)}>
        {marker.showInfo && (
          <InfoWindow
          onCloseClick={() => props.onMarkerClose(marker)}
          defaultOptions={{
            disableAutoPan:true
          }}>
            <div className="infowindow">{marker.infoContent}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));


class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
    }
  }

  componentDidMount(){

  
      const vernissageIds = this.props.events.filter((event) => {
          const today = new Date();
          const splitted = event.eventStartDate.split('-');
          const vernissage = new Date(event.eventStartDate.split('-').reverse().join('-')+"T12:00:00-00:00");
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
                  showInfo: false,
                  key: space.spaceName,
                  icon:mapMarkerCircle,
                  infoContent: space.spaceName,
                }
        } else {
          return {
                  position: {
                    lat: parseFloat(space.spaceLat),
                    lng: parseFloat(space.spaceLong),
                  },
                  showInfo: false,
                  key: space.spaceName,
                  icon:mapMarkerCross,
                  infoContent: space.spaceName,
                }
        }


      }) : [];

      this.setState({
        markers:markers,
      });




  }

  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  handleMarkerClick(targetMarker) {
  this.setState({
    markers: this.state.markers.map(marker => {
      if (marker === targetMarker) {
        return {
          ...marker,
          showInfo: true,
        };
      }
      return {
        ...marker,
        showInfo: false,
      };
    }),
  });
}

handleMarkerClose(targetMarker) {
  this.setState({
    markers: this.state.markers.map(marker => {
      if (marker === targetMarker) {
        return {
          ...marker,
          showInfo: false,
        };
      }
      return marker;
    }),
  });
}

onMapClick(){
  this.setState({
    markers: this.state.markers.map(marker => {
        return {
          ...marker,
          showInfo: false,
        };
    }),
  });
}

  render() {
    return (
      <SimpleMapExampleGoogleMap

        className="Map"

        markers={this.state.markers}

        onMapClick={this.onMapClick.bind(this)}

        onMarkerClick={this.handleMarkerClick.bind(this)}
        onMarkerClose={this.handleMarkerClose.bind(this)}

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
