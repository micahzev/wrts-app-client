import React, { Component } from 'react';
import { Link } from 'react-router';

import '../styles/spaces.css';

class Space extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const URL = "http://" + this.props.space.spaceUrl;

    return (
      <div className="spacecontainer spaceChild">
        <div className="leftspacecontainer spacename spaceData">
          {this.props.space.spaceName}
        </div>
        <div className="rightspacecontainer spaceData">
          <div className="spaceaddress">
            {this.props.space.spaceAddress}
          </div>

          <a href={URL} className="spaceurl">
            {this.props.space.spaceUrl}
          </a>
        </div>
      </div>
    );
  }
}

export default Space;
