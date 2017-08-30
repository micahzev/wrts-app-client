import React, { Component } from 'react';
import '../styles/pastevents.css';
import { Grid, Row, Col } from 'react-bootstrap';
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

    return (
      <div>
        {show?
          <div className="pastEventsOverlay">
            <div className="closeButton" onClick={this.hideMe.bind(this)}>
            </div>
            <Grid className="Grid">
              <Row className="Row Header">
              <PastEventsHead />

              </Row>
              <Row className="Row Column">
              {pastEvents.map((eventData,idx) =>
                <AgendaItem key={idx} events={eventData} spaces={allSpaces}/>
              )}
              </Row>
            </Grid>
          </div>
          : null}

      </div>
    );
  }
}

export default PastEvents;
