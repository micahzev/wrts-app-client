import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import '../App.css';
import '../styles/loader.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {  withRouter, NavLink } from 'react-router-dom';

import Map from './Map';
import Agenda from './Agenda';
import Spaces from './Spaces';

import Maphead from './Maphead';
import Agendahead from './Agendahead';
import Spaceshead from './Spaceshead';
import fetch from './fetch';
import Landing from './Landing';

import Contact from './Contact';
import PastEvents from './PastEvents';

import { fetchSpaces } from '~/src/actions/spaces';
import { fetchEvents } from '~/src/actions/events';

import { CSSTransitionGroup } from 'react-transition-group';

import { Loader } from 'react-loaders';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      showLanding: true,
      showOverLay: false,
      showPastEventsOverlay: false,
      loading:true
    }
    this.contactsOverlay.bind(this);
  }

  componentDidUpdate(){


    if (this.props.events.length > 0 && this.props.spaces.length > 0 && this.state.loading){

      this.setState({
        loading:false,
      });

        // this.refs.scrollcolumns.scrollLeft += window.innerWidth;
        // window.requestAnimationFrame(function() {
        //     _this.refs.scrollcolumns.scrollLeft += window.innerWidth;
        // });
    }
  }

  componentDidMount() {
    findDOMNode(this.refs.appityapp).addEventListener('wheel', this.handleScroll.bind(this), true);
    findDOMNode(this.refs.appityapp).addEventListener('click', this.handleClick.bind(this), true);
    // this.refs.leftScrollOverlay.scrollTop +=  window.innerHeight;
    //this sets the position on landing of the central column
  //   this.refs.scrollcolumns.scrollLeft += this.refs.agendacolumn.getBoundingClientRect().left - (0.05*window.innerWidth);
  }

  componentWillUnmount() {
    findDOMNode(this.refs.appityapp).removeEventListener('wheel', this.handleScroll.bind(this), true);
    findDOMNode(this.refs.appityapp).addEventListener('click', this.handleClick.bind(this), true);
  }

  handleScroll(event) {
    if (this.state.showLanding) {
      this.setState({
        showLanding:false
      })
    }
    // const toMove = 0.4*Math.abs(event.deltaY);
    // if (event.deltaY < 0) {
    //    this.refs.leftScrollOverlay.scrollTop -= toMove;
    //    this.refs.rightScrollOverlay.scrollTop +=  toMove;
    //  }
    //  if (event.deltaY > 0) {
    //    this.refs.leftScrollOverlay.scrollTop += toMove;
    //    this.refs.rightScrollOverlay.scrollTop -=  toMove;
    //  }
  }

  handleClick(event){
    if (this.state.showLanding) {
      this.setState({
        showLanding:false
      })
    }

  }

  contactsOverlay() {
    this.setState({
      showOverLay:true,
    })
  }

  undoShow(){
    this.setState({
      showOverLay:false,
      showPastEventsOverlay: false,
    })
  }

  pastEventsOverlay() {
    this.setState({
      showPastEventsOverlay:true,
    })
  }

  sortAndFilterEvents(events){
    const sortedEvents = _.sortBy(events, [function(o) {
      let splitted = o.eventStartDate.split('-');
      return Date.parse([splitted[2],splitted[1],splitted[0]].join('-'));
    }]);

    return sortedEvents.filter(function(o) {
      let splitted = o.eventEndDate.split('-');
      let today = new Date();
      return Date.parse([splitted[2],splitted[1],splitted[0]].join('-')) < today;
    });


  }

  render() {

    const allEvents = this.props.events ? this.props.events : [];
    
    const filteredEvents = this.props.events ? this.sortAndFilterEvents(allEvents) : [];

    const allSpaces = this.props.spaces ? this.props.spaces : [];

    return (
      <div ref='appityapp' >
      {this.state.loading ?
        <div className="loader-case">
          <Loader className="loader" type="ball-pulse-rise" active />
        </div>  :
        <div className='App'>
          <CSSTransitionGroup
            transitionName="landingTransition"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={1300}>
                {this.state.showLanding ?  <Landing className="Landme" /> : null}
          </CSSTransitionGroup>


          <div className='RowChildHead' >
            <div className='HeaderChild' >
                <Maphead />
            </div>
            <div className='HeaderChildMiddle' >
                <Agendahead />
            </div>
            <div className='HeaderChild' >
                <Spaceshead  />
            </div>
          </div>
          <div ref="scrollcolumns" className='RowChildCol' >
            <div  className='ColumnChild' >
                  <Map className='ComponentChild' spaces={this.props.spaces} events={this.props.events}/>
            </div>
            <div ref="agendacolumn" className='ColumnChild' >
                  <p className="currentLabel">current</p>
                  <p className="futurLabel" >upcoming events</p>
                  <Agenda className='ComponentChildAgenda' events={this.props.events} spaces={this.props.spaces} />
            </div>
            <div className='ColumnChild' >
                  <p className="contactButton" onClick={this.contactsOverlay.bind(this)}>about</p>
                  <br/>
                  <p className="pastEventsButton" onClick={this.pastEventsOverlay.bind(this)}>past events</p>
                  <Contact show={this.state.showOverLay} undoShow={this.undoShow.bind(this)} />
                  <PastEvents show={this.state.showPastEventsOverlay} spaces={allSpaces} events={filteredEvents} undoShow={this.undoShow.bind(this)} />
                  <Spaces className='ComponentChildSpaces' spaces={this.props.spaces} events={this.props.events}/>
                  <NavLink className="loginButton" to="/login">members</NavLink>
            </div>
          </div>

        </div> }
      </div>
    );
  }
}

const FetchedData = fetch(Layout, {
  actions: [fetchSpaces, fetchEvents]
});


function mapStateToProps(state) {
  const spaces = state.spaces;
  const events = state.events;
  return {
    spaces,
    events
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchSpaces: bindActionCreators(fetchSpaces, dispatch),
    fetchEvents: bindActionCreators(fetchEvents, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FetchedData));
