import React, { Component } from 'react';
import '../styles/spaces.css';

class Space extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="spacecontainer">
      <div className="leftspacecontainer">
        {this.props.space.spaceName}
      </div>
      <div className="rightspacecontainer">
        <div>
          {this.props.space.spaceAddress}
        </div>
        <div>
          {this.props.space.spaceUrl}
        </div>
      </div>




      </div>
    );
  }
}

export default Space;
