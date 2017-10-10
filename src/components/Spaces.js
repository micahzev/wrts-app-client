import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Space from './Space';

import '../styles/spaces.css';

class Spaces extends Component {

  constructor(props) {
    super(props);
    this.contactsOverlay.bind(this);
    this.state = {
      showOverLay: false,
      showPastEventsOverlay: false,
    }
  }

  contactsOverlay() {
    this.setState({
      showOverLay:true,
    })
  }

  undoShow(){
    this.setState({
      showOverLay:false,
      showPastEventsOverlay: false,
    })
  }

  pastEventsOverlay() {
    this.setState({
      showPastEventsOverlay:true,
    })
  }

  sortAndFilterEvents(events){
    const sortedEvents = _.sortBy(events, [function(o) {
      let splitted = o.eventStartDate.split('-');
      return Date.parse([splitted[2],splitted[1],splitted[0]].join('-'));
    }]);

    return sortedEvents.filter(function(o) {
      let splitted = o.eventEndDate.split('-');
      let today = new Date();
      return Date.parse([splitted[2],splitted[1],splitted[0]].join('-')) < today;
    });


  }
  
  sortSpaces(spaces){
    const sortedSpaces = _.sortBy(spaces, [function(o) {
      return o.spaceName.toLowerCase();
    }]);

    return sortedSpaces;
  }


  render() {


    const allEvents = this.props.events ? this.props.events : [];
    const filteredEvents = this.props.events ? this.sortAndFilterEvents(allEvents) : [];

    const allSpaces = this.props.spaces ? this.sortSpaces(this.props.spaces) : [];

    return (
      <div className="spaceScroll" >
        <div ref="spaceparent" className="SpaceParent">
          {allSpaces.map((spaceData,idx) =>
            <Space key={idx} space={spaceData} />
          )}
        </div>
      </div>
    );
  }
}

export default Spaces;
