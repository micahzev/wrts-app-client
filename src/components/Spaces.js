import React, { Component } from 'react';
// import Spaceslist from './Spaceslist';
import Space from './Space';

import '../styles/spaces.css';

class Spaces extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const allSpaces = this.props.spaces ? this.props.spaces : [];

    return (
      <div className="Space">
          {allSpaces.map((spaceData,idx) =>
            <Space key={idx} space={spaceData} />
          )}
      </div>
    );
  }
}

export default Spaces;
