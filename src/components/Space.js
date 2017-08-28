import React, { Component } from 'react';
import '../styles/spaces.css';

class Space extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="spacecontainer">
        <div className="leftspacecontainer spacename">
          {this.props.space.spaceName}
        </div>
        <div className="rightspacecontainer">
          <div className="spaceaddress">
            {this.props.space.spaceAddress}
          </div>
          <div className="spaceurl">
            {this.props.space.spaceUrl}
          </div>
        </div>




      </div>
    );
  }
}

export default Space;
