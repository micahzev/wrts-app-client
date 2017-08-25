import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom';
import Space from './Space';

import '../styles/spaces.css';

class Spaces extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const allSpaces = this.props.spaces ? this.props.spaces : [];

    return (
      <div>
        <div className="Space">
            {allSpaces.map((spaceData,idx) =>
              <Space key={idx} space={spaceData} />
            )}
        </div>
        <NavLink className="loginButton" to="/login">login</NavLink>
      </div>
    );
  }
}

export default Spaces;
