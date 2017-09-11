import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import '../App.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';

import Map from './Map';
import Agenda from './Agenda';
import Spaces from './Spaces';

import Maphead from './Maphead';
import Agendahead from './Agendahead';
import Spaceshead from './Spaceshead';
import fetch from './fetch';

import { fetchSpaces } from '~/src/actions/spaces';
import { fetchEvents } from '~/src/actions/events';


class Layout extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  // componentDidUpdate(){
  //
  //   var _this = this;
  //
  //   if (this.props.events.length > 0 && this.props.spaces.length > 0){
  //
  //     // this.refs.scrollcolumns.scrollLeft += window.innerWidth;
  //       // window.requestAnimationFrame(function() {
  //       //     _this.refs.scrollcolumns.scrollLeft += window.innerWidth;
  //       // });
  //   }
  // }

  componentDidMount() {
    findDOMNode(this.refs.appityapp).addEventListener('wheel', this.handleScroll.bind(this), true);
    this.refs.leftScrollOverlay.scrollTop +=  window.innerHeight;
    //this sets the position on landing of the central column
    this.refs.scrollcolumns.scrollLeft += this.refs.agendacolumn.getBoundingClientRect().left - (0.05*window.innerWidth);
  }

  componentWillUnmount() {
    findDOMNode(this.refs.appityapp).removeEventListener('wheel', this.handleScroll.bind(this), true);
  }

  handleScroll(event) {
    const toMove = 0.4*Math.abs(event.deltaY);
    if (event.deltaY < 0) {
       this.refs.leftScrollOverlay.scrollTop -= toMove;
       this.refs.rightScrollOverlay.scrollTop +=  toMove;
     }
     if (event.deltaY > 0) {
       this.refs.leftScrollOverlay.scrollTop += toMove;
       this.refs.rightScrollOverlay.scrollTop -=  toMove;
     }
  }

  render() {

    return (
      <div ref='appityapp' className='App'>

        <div ref='leftScrollOverlay' id='leftScrollOverlay' className='leftScrollOverlay'>
        <div ref='whiteBottom' id='whiteBottom' className='whiteBottom'>
          <ul>
            <li className='blueListItem'>we run</li>
            <li className='blueListItem'>the space</li>
            <li className='blueListItem'>we run</li>
            <li className='blueListItem'>the space</li>
            <li className='blueListItem'>we run</li>
            <li className='blueListItem'>the space</li>
            <li className='blueListItem'>we run</li>
            <li className='blueListItem'>the space</li>
            <li className='blueListItem'>we run</li>
            <li className='blueListItem'>the space</li>
          </ul>
        </div>
          <div ref='redTop' id='redTop' className='redTop'>
            <ul>
              <li className='redListItem'>we run</li>
              <li className='redListItem'>the space</li>
              <li className='redListItem'>we run</li>
              <li className='redListItem'>the space</li>
              <li className='redListItem'>we run</li>
              <li className='redListItem'>the space</li>
              <li className='redListItem'>we run</li>
              <li className='redListItem'>the space</li>
              <li className='redListItem'>we run</li>
              <li className='redListItem'>the space</li>
            </ul>
          </div>

        </div>

        <div ref='rightScrollOverlay' id='rightScrollOverlay' className='rightScrollOverlay'>
          <div ref='whiteTop' id='whiteTop' className='whiteTop'>
            <ul>
              <li className='blueListItem'>we run</li>
              <li className='blueListItem'>the space</li>
              <li className='blueListItem'>we run</li>
              <li className='blueListItem'>the space</li>
              <li className='blueListItem'>we run</li>
              <li className='blueListItem'>the space</li>
              <li className='blueListItem'>we run</li>
              <li className='blueListItem'>the space</li>
              <li className='blueListItem'>we run</li>
              <li className='blueListItem'>the space</li>
            </ul>
          </div>
          <div ref='redBottom' id='redBottom' className='redBottom'>
            <ul>
              <li className='redListItem'>we run</li>
              <li className='redListItem'>the space</li>
              <li className='redListItem'>we run</li>
              <li className='redListItem'>the space</li>
              <li className='redListItem'>we run</li>
              <li className='redListItem'>the space</li>
              <li className='redListItem'>we run</li>
              <li className='redListItem'>the space</li>
              <li className='redListItem'>we run</li>
              <li className='redListItem'>the space</li>
            </ul>
          </div>
        </div>

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
                <Agenda className='ComponentChildAgenda' events={this.props.events} spaces={this.props.spaces} />
          </div>
          <div className='ColumnChild' >
                <Spaces className='ComponentChildSpaces' spaces={this.props.spaces} events={this.props.events}/>
          </div>
        </div>
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
