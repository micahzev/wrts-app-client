import React, { Component } from 'react';
import AgendaItem from './AgendaItem';
import { findDOMNode } from 'react-dom';

import _ from 'lodash';

import '../styles/agenda.css';

class Agenda extends Component {

  constructor(props) {
    super(props);
  }


  componentDidUpdate(){

    var _this = this;

    if (this.props.events.length > 0 && this.props.spaces.length > 0 && this.refs.scrolltome){

        window.requestAnimationFrame(function() {
            const offset = 0.3 * window.innerHeight;
            if ((_this.refs.scrolltome.getBoundingClientRect().top - offset) > (_this.refs.scrolltest.scrollHeight-window.innerHeight)) {
                _this.refs.scrolltest.scrollTop = _this.refs.scrolltest.scrollHeight-window.innerHeight;
            } else {
                _this.refs.scrolltest.scrollTop += _this.refs.scrolltome.getBoundingClientRect().top - offset;
            }
        });
    }
  }



  sortAndFilterEvents(events){
    const sortedEvents = _.sortBy(events, [function(o) {
      let splitted = o.eventStartDate.split('-');
      return Date.parse([splitted[2],splitted[1],splitted[0]].join('-'));
    }]);

    const scrollToIndex = sortedEvents.findIndex(function(o) {
      let splitted = o.eventStartDate.split('-');
      let today = new Date();
      return Date.parse([splitted[2],splitted[1],splitted[0]].join('-')) > today;
    });

    sortedEvents.forEach(function(element) {
        element.scroller = element.eventArtist;
    });

    if (scrollToIndex > -1) {
      sortedEvents[scrollToIndex].scroller = "scrolltome";
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
        <p className="currentLabel">current</p>
        <p className="futurLabel" >upcoming events</p>
        {filteredEvents.map((eventData,idx) =>
          <div key={idx} ref={eventData.scroller}>
            <AgendaItem events={eventData} spaces={allSpaces}/>
          </div>
        )}
      </div>
    );
  }
}

export default Agenda;
