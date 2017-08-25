import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom';
import Space from './Space';
import Contact from './Contact'

import '../styles/spaces.css';

class Spaces extends Component {

  constructor(props) {
    super(props);
    this.contactsOverlay.bind(this);
    this.state = {
      showOverLay: false,
    }
  }

  contactsOverlay() {
      this.setState({
        showOverLay:true,
      })
  }

  undoShow(){
    this.setState({
      showOverLay:false,
    })
  }

  render() {

    const allSpaces = this.props.spaces ? this.props.spaces : [];

    return (
      <div>
        <p className="contactButton" onClick={this.contactsOverlay.bind(this)}>contact</p>
          <Contact show={this.state.showOverLay} undoShow={this.undoShow.bind(this)}/>
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
