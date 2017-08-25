import React, { Component } from 'react';
import AgendaItem from './AgendaItem';

import _ from 'lodash';

import '../styles/agenda.css';

class Agenda extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let allEvents = this.props.events ? this.props.events : {};

    const allSpaces = this.props.spaces ? this.props.spaces : undefined;

    // sort all events by start date
    if (Object.keys(allEvents).length > 0) {
      allEvents = _.sortBy(allEvents, [function(o) { return o.eventStartDate; }]);
    }

    return (
      <div className="Space">
          {allEvents.map((eventData,idx) =>
            <AgendaItem key={idx} events={eventData} spaces={allSpaces}/>
          )}
      </div>
    );
  }
}

export default Agenda;
