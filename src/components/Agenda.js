import React, { Component } from 'react';
import AgendaItem from './AgendaItem';
import '../styles/agenda.css';

class Agenda extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const allEvents = this.props.events ? this.props.events : {};

    const allSpaces = this.props.spaces ? this.props.spaces : undefined;

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
