import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
import '../styles/agenda.css';

import Mailto from 'react-mailto';

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
      extraInfo:'',
      contact:'',
      facebook:'',
      isVernissage:false,
      hasHappened:false,
      showExpansion:false,
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
    const vernissage = new Date([splitted[2],splitted[1],splitted[0]].join('-')+"T12:00:00-00:00");
    const isVernissage = this.sameDay(today,vernissage);

    const hasHappened = this.pastDay(today, vernissage);

    this.setState({
      spaceName:space ? space.spaceName : "",
      startDate:inputProps.events.eventStartDate.replace(/-/g,'.'),
      endDate:inputProps.events.eventEndDate.replace(/-/g,'.'),
      artist:inputProps.events.eventArtist,
      exposition:inputProps.events.eventExposition,
      startTime:inputProps.events.eventStartTime,
      endTime:inputProps.events.eventEndTime,
      extraInfo:inputProps.events.eventExtraInfo ? inputProps.events.eventExtraInfo : "",
      contact:inputProps.events.eventContact ? inputProps.events.eventContact : "",
      facebook:inputProps.events.eventFacebook ? inputProps.events.eventFacebook : "",
      isVernissage:inputProps.events.isVernissage,
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

  expand(){
    this.setState({
      showExpansion:!this.state.showExpansion,
    })
  }

  handleClick(e) {
     e.stopPropagation();
     console.log('child');
   }

  render() {

    // const colorToUse = this.props.styler ? {color:'white'} : {color:'#0c0321'};

    const styler = this.state.isVernissage ? "vernissageItem"   : this.state.hasHappened ?
    "hasHappenedItem" :  "AgendaChild";

      const splitted1 = this.state.startDate ? this.state.startDate.split('.') : ["  ","  ","    "];
      splitted1[2] = splitted1[2].slice(-2);
      const joined1 = splitted1.join('.');

      const splitted2 = this.state.endDate ? this.state.endDate.split('.') : ["  ","  ","    "];
      splitted2[2] = splitted2[2].slice(-2);
      const joined2 = splitted2.join('.');

    const expos = {fontStyle:'italic',paddingTop:'1.5%'};



    return (
      <div  className={styler} onClick={this.expand.bind(this)}>
            <div className="agendaSplitTop">
                    <div className="agendaDataDate">
                    <div className="dateTop">
                    {joined1}
                    </div>
                    <div className="dateBottom">
                      {this.state.hasHappened && ' to ' + joined2}
                    </div>

                    </div>

                    <div className="agendaDataName">
                      {this.state.spaceName}
                    </div>

                    {
                      !this.state.hasHappened &&
                             <div className="agendaDataTime">
                                <div className="timeTop">
                                {this.state.startTime}
                                </div>
                                <div className="timeBottom">
                                  {this.state.endTime}
                                </div>

                             </div>
                    }
            </div>

                    <div className="agendaDataInfo">

                      <div >
                        {this.state.artist}
                      </div>

                      <div style={expos}>
                        {this.state.exposition}
                      </div>


                        {this.state.showExpansion ?

                          <div className="expansionBox">
                               <div className="extraInfo">
                                {this.state.extraInfo}
                               </div>

                               <div className="expansionLinks">


                                  <Mailto email={this.state.contact} onClick={this.handleClick.bind(this)} className="expansionContact">
                                    Contact

                                  </Mailto>





                                  <a href={this.state.facebook} onClick={this.handleClick.bind(this)} className="expansionFacebook">
                                      Event Facebook
                                  </a>




                               </div>
                           </div>


                           : null}

                    </div>


                    {!this.state.showExpansion ?
                      <div className="downarrow"> &#8595;</div> :
                    <div className="uparrow"> &#8595;</div> }


      </div>
    );
  }
}

export default AgendaItem;
