import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom';
import Space from './Space';
import Contact from './Contact';
import PastEvents from './PastEvents';

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


  render() {


    const allEvents = this.props.events ? this.props.events : [];
    const filteredEvents = this.props.events ? this.sortAndFilterEvents(allEvents) : [];

    const allSpaces = this.props.spaces ? this.props.spaces : [];


    return (
      <div className="spaceScroll" >
        <p className="contactButton" onClick={this.contactsOverlay.bind(this)}>contact</p>
        <br/>
        <p className="pastEventsButton" onClick={this.pastEventsOverlay.bind(this)}>past events</p>
        <Contact show={this.state.showOverLay} undoShow={this.undoShow.bind(this)} />
        <PastEvents show={this.state.showPastEventsOverlay} spaces={allSpaces} events={filteredEvents} undoShow={this.undoShow.bind(this)} />
        <div className="SpaceParent">
          {allSpaces.map((spaceData,idx) =>
            <Space key={idx} space={spaceData} />
          )}
        </div>
        <NavLink className="loginButton" to="/login">login</NavLink>
      </div>
    );
  }
}

export default Spaces;
