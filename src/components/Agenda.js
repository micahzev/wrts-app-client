import React, { Component } from 'react';
import AgendaItem from './AgendaItem';

import _ from 'lodash';

import '../styles/agenda.css';

class Agenda extends Component {

  constructor(props) {
    super(props);
  }

  sortAndFilterEvents(events){
    const sortedEvents = _.sortBy(events, [function(o) {
      let splitted = o.eventStartDate.split('-');
      return Date.parse([splitted[2],splitted[1],splitted[0]].join('-'));
    }]);

    return sortedEvents.filter(function(o) {
      let splitted = o.eventEndDate.split('-');
      let today = new Date();
      return Date.parse([splitted[2],splitted[1],splitted[0]].join('-')) > today;
    });


  }

  render() {

    const allEvents = this.props.events ? this.props.events : [];
    const filteredEvents = this.props.events ? this.sortAndFilterEvents(allEvents) : [];

    const allSpaces = this.props.spaces ? this.props.spaces : undefined;

    return (
      <div className="AgendaParent">
        <p className="currentLabel">current</p>
        <p className="futurLabel" >upcoming events</p>
        {filteredEvents.map((eventData,idx) =>
          <AgendaItem key={idx} events={eventData} spaces={allSpaces}/>
        )}
      </div>
    );
  }
}

export default Agenda;
