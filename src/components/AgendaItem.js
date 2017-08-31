import React, { Component } from 'react';
import _ from 'lodash';
import '../styles/agenda.css';

class AgendaItem extends Component {
  constructor(props) {
    super(props);
    this.updateComponent.bind(this);
    this.sameDay.bind(this);
    this.pastDay.bind(this);
    this.state = {
      spaceName:'',
      startDate:'',
      endDate:'',
      artist:'',
      exposition:'',
      startTime:'',
      endTime:'',
      isVernissage:false,
      hasHappened:false
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
    // find space name
    const space = _.find(inputProps.spaces, function(o) {
      return o.spaceId == inputProps.events.spaceId;
    });

      // check vernissage
    const today = new Date();
    const splitted = inputProps.events.eventStartDate.split('-');
    const vernissage = new Date([splitted[2],splitted[1],splitted[0]].join('-'));
    const isVernissage = this.sameDay(today,vernissage);

    const hasHappened = this.pastDay(today, vernissage);


    this.setState({
      spaceName:space.spaceName,
      startDate:inputProps.events.eventStartDate.replace(/-/g,'.'),
      endDate:inputProps.events.eventEndDate.replace(/-/g,'.'),
      artist:inputProps.events.eventArtist,
      exposition:inputProps.events.eventExposition,
      startTime:inputProps.events.eventStartTime,
      endTime:inputProps.events.eventEndTime,
      isVernissage:isVernissage,
      hasHappened:hasHappened
    });
  }


  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  pastDay(today, otherDay) {
    return otherDay.setHours(0,0,0,0) < today.setHours(0,0,0,0);
  }

  render() {

    // const styler = this.state.isVernissage ?  : {};
    //
    // const styler = this.state.hasHappened ?
    //   Object.assign({backgroundColor:'red',color:'black'} ,styler)
    //  : styler;

     const styler = this.state.isVernissage ? {color:'#E6323D'}   : this.state.hasHappened ?
     { backgroundColor:'#E6323D',
       color:'black',
       borderStyle: 'solid',
       borderTop:'none',
       borderLeft:'none',
       borderRight:'none',
       borderBottomColor: 'black',
       borderBottomStyle: 'solid',
       borderBottomWidth: 'thin'
     }
      :  {};

    const expos = {fontStyle:'italic'};

    const spaceStyle = {fontWeight:'bold'};

    return (
      <div style={styler} className="AgendaChild">
        <div className="agendaData">
          {this.state.startDate} {this.state.hasHappened && 'to ' + this.state.endDate}
        </div>

        <div style={spaceStyle} className="agendaData">
          {this.state.spaceName}
        </div>

        <div className="agendaData">

          <div >
            {this.state.artist}
          </div>

          <div style={expos}>
            {this.state.exposition}
          </div>

        </div>
        {
          !this.state.hasHappened &&
                 <div className="agendaData">
                   {this.state.startTime}-{this.state.endTime}
                 </div>
        }
      </div>
    );
  }
}

export default AgendaItem;
