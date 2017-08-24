import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetch from '~/src/components/fetch';
import { fetchSpaces } from '~/src/actions/spaces';
import Space from './Space';

import '../styles/spaces.css';

class Spaceslist extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Space">
        <ul>
          {this.props.spaces.map((spaceData,idx) =>
            <Space key={idx} space={spaceData} />)}
        </ul>
      </div>
    );
  }
}

const FetchedSpaces = fetch(Spaceslist, {
  actions: [fetchSpaces]
});


function mapStateToProps(state) {
  const spaces = state.spaces;
  return { spaces };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchSpaces: bindActionCreators(fetchSpaces, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchedSpaces);
