import React, { Component } from 'react';
import '../styles/pastevents.css';
import PastEventsHead from './PastEventsHead';
import AgendaItem from './AgendaItem';

class PastEvents extends Component {
  constructor(props) {
    super(props);
    this.hideMe.bind(this);
  }


  hideMe() {
    this.props.undoShow();
  }

  render() {

    const show = this.props.show;
    const pastEvents = this.props.events ? this.props.events : [];
    const allSpaces = this.props.spaces ? this.props.spaces : [];

    const pastStyle = {color:"white"};

    return (
      <div>
        {show?
          <div className="pastEventsOverlay">
            <div className="closeButton" onClick={this.hideMe.bind(this)}>
            </div>
            <div >
              <div >
              <PastEventsHead />

              </div>
              <div className="pastEvents">
              {pastEvents.map((eventData,idx) =>
                <AgendaItem key={idx} styler={pastStyle} events={eventData} spaces={allSpaces}/>
              )}
              </div>
            </div>
          </div>
          : null}

      </div>
    );
  }
}

export default PastEvents;
