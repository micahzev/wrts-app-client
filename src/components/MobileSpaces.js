import React, { Component } from 'react';

import '../styles/map.css';

import Spaceshead from './Spaceshead';
import Spaces from './Spaces';

import { CSSTransitionGroup } from 'react-transition-group';

class MobileSpaces extends Component {
  constructor(props){
    super(props);

  }

hideMe() {
  this.props.undoShow();
}

spaceToShow(event){
return;
}

  render() {

    return (

        <CSSTransitionGroup
          transitionName="pastEventsTransition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          <div className='MobileSpacesContainer'>
            <div className='HeaderChildMapMobile' >
                <Spaceshead  />
                <div className="mapCloseButton" onClick={this.hideMe.bind(this)}>
                </div>
            </div>
            <Spaces spaceToShow={this.spaceToShow.bind(this)} className='MobileChildSpaces' spaces={this.props.spaces} events={this.props.events}/>
          </div>

      </CSSTransitionGroup>

    );
  }
}

export default MobileSpaces;
