import React, { Component } from 'react';

import '../styles/landing.css';

class Landing extends Component {


  render() {

    return (
      <div className="Landing" >

        <div className="LandingRed" >
          <span className="we">WE </span>  <span className="run"> RUN</span>
        </div>
        <div className="LandingWhite">
          <span className="the">THE </span>  <span className="space"> SPACE</span>
      </div>

      </div>
    );
  }
}

export default Landing;
