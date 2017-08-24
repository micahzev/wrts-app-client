import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ListActions from '../actions/list_spaces';

import '../styles/spaces.css';

class Spaceslist extends Component {

  constructor(props) {
    super(props);

    // this.state = {
    // };
  }

  // const spaces = this.props.spaces.map((item,idx) => {
  //   return <li key={idx}>{item}</li>
  // })

  // {spaces}


  render() {


    return (
      <div className="Space">
        <ul>

        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, prop) {
  return {
    spaces: state.spaces
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(ListActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spaceslist);
