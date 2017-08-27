import React, { Component } from 'react';
import {  withRouter } from 'react-router';

import '../styles/backend.css';


class Backend extends Component {

  constructor(props) {
    super(props);

  }



  render() {
    return (
      <div className="Backend">

        WRTS BACKEND DATA MANAGEMENT AREA

      </div>
    );
  }

}

export default withRouter(Backend);
