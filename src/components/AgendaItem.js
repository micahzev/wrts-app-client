import React, { Component } from 'react';
import _ from 'lodash';
import '../styles/agenda.css';

class AgendaItem extends Component {
  constructor(props) {
    super(props);
    this.updateComponent.bind(this);
    this.state = {
      spaceName:"",
      startDate:"",
      endDate:"",
      artist:"",
      exposition:"",
      startTime:"",
      endTime:"",
    }
  }

  componentDidMount() {
    if(this.props.spaces && Object.keys(this.props.events).length > 0) {
      this.updateComponent(
        {
          spaces: this.props.spaces,
          events: this.props.events
        }
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.spaces && Object.keys(nextProps.events).length > 0) {
      this.updateComponent(nextProps);
    }
  }

  updateComponent(inputProps) {
      const space = _.find(inputProps.spaces, function(o) {
        return o.spaceId == inputProps.events.spaceId;
      });
      this.setState({
        spaceName:space.spaceName,
        startDate:inputProps.events.eventStartDate.replace(/-/g,'.'),
        endDate:inputProps.events.eventEndDate.replace(/-/g,'.'),
        artist:inputProps.events.eventArtist,
        exposition:inputProps.events.eventExposition,
        startTime:inputProps.events.eventStartTime,
        endTime:inputProps.events.eventEndTime,
      });
  }

  render() {
    return (
      <div className="eventcontainer">
        <div className="agendaData">
           {this.state.startDate}
         </div>

              <div className="agendaData">
                  {this.state.spaceName}
              </div>

              <div className="agendaData">

                 <div >
                     {this.state.artist}
                 </div>

                 <div>
                     {this.state.exposition}
                 </div>

             </div>
             <div className="agendaData">
               {this.state.startTime}-{this.state.endTime}
             </div>
      </div>
    );
  }
}

export default AgendaItem;
