import React, { Component } from 'react';
import AgendaItem from './AgendaItem';
import { findDOMNode } from 'react-dom';

import _ from 'lodash';

import '../styles/agenda.css';

class Agenda extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    }
  }


  componentDidUpdate(){
    if (this.state.counter < 1){
      var _this = this;

      if (this.props.events.length > 0 && this.props.spaces.length > 0 && this.refs.scrolltome){

          window.requestAnimationFrame(function() {
              const offset = 1.3*window.innerHeight;
              if ((_this.refs.scrolltome.getBoundingClientRect().top - offset) > (_this.refs.scrolltest.scrollHeight-window.innerHeight)) {
                  _this.refs.scrolltest.scrollTop = _this.refs.scrolltest.scrollHeight-window.innerHeight;
              } else {
                  _this.refs.scrolltest.scrollTop += _this.refs.scrolltome.getBoundingClientRect().top - offset;
              }
          });

          this.setState({
            counter:1
          });
      }
    }

  }



  sortAndFilterEvents(events){
    const sortedEvents = _.sortBy(events, [function(o) {
      let splitted = o.eventStartDate.split('-');
      return Date.parse(splitted.reverse().join('-')+"T12:00:00-00:00");
    }]);

    const scrollToIndex = sortedEvents.findIndex(function(o) {
      let splitted = o.eventStartDate.split('-');
      let today = new Date();
      // console.log(today);
      return Date.parse([splitted[2],splitted[1],splitted[0]].join('-')+"T12:00:00-00:00") > today;
    });

    sortedEvents.forEach(function(element) {
        element.scroller = element.eventArtist;
        element.lastHashappened = element.eventStartTime;
    });

    if (scrollToIndex > -1) {
      sortedEvents[scrollToIndex-1].scroller = "scrolltome";
      sortedEvents[scrollToIndex-2].lastHashappened = "specialClass"
    }

    return sortedEvents.filter(function(o) {
      let splitted = o.eventEndDate.split('-');
      let today = new Date();
      return Date.parse([splitted[2],splitted[1],splitted[0]].join('-')) > today;
    });


  }

  render() {

    const allEvents = this.props.events ? this.props.events : [];
    const filteredEvents = (this.props.events.length > 0 && this.props.spaces.length > 0) ? this.sortAndFilterEvents(allEvents) : [];

    const allSpaces = this.props.spaces ? this.props.spaces : undefined;

    return (
      <div className="AgendaParent" ref="scrolltest" >
        {filteredEvents.map((eventData,idx) =>
          <div key={idx} className={eventData.lastHashappened} ref={eventData.scroller}>
            <AgendaItem events={eventData} spaces={allSpaces}/>
          </div>
        )}
        <div className="whitespace">
        .
        </div>
      </div>
    );
  }
}

export default Agenda;
