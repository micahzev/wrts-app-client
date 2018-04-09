import React, { Component } from 'react';
import { Link } from 'react-router';

import '../styles/spaces.css';

class Space extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url:undefined
    };
  }

  openInNewTab() {
    let win = window.open(this.state.url, '_blank');
    // win.focus();
  }

  componentDidMount(){
    this.setState({
      url: 'http://' + this.props.space.spaceUrl.trim()
    })
  }

  render() {
    return (
      <div className="spacecontainer spaceChild">
        <div className="leftspacecontainer spacename spaceData" value={this.props.space.spaceName} onClick={this.props.spaceToShow.bind(this)}>
          {this.props.space.spaceName}
        </div>
        <div className="rightspacecontainer spaceData">
          <div className="spaceaddress">
            {this.props.space.spaceAddress}
          </div>

          <div onClick={this.openInNewTab.bind(this)} className="spaceurl">
            {this.props.space.spaceUrl}
          </div>
        </div>
      </div>
    );
  }
}

export default Space;
