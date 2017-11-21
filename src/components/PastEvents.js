import React, { Component } from 'react';
import '../styles/pastevents.css';
import PastEventsHead from './PastEventsHead';
import AgendaItem from './AgendaItem';
import { CSSTransitionGroup } from 'react-transition-group';

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

    const pastStyle = {color:'white'};

    return (
      <div>
        <CSSTransitionGroup
          transitionName="pastEventsTransition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {show?
            <div className="pastEventsOverlay">
              <div className="closeButton" onClick={this.hideMe.bind(this)}>
              </div>
              <div className="pastEventsDiv">

                <PastEventsHead />

                <div className="pastEventsScroll">
                  <div className="pastEvents">
                    {pastEvents.map((eventData,idx) =>
                      <AgendaItem spaceToShow={this.props.spaceToShow.bind(this)} key={idx} styler={pastStyle} events={eventData} spaces={allSpaces}/>
                    )}
                  </div>
                </div>
              </div>
            </div>
            : null}
        </CSSTransitionGroup>

      </div>
    );
  }
}

export default PastEvents;
