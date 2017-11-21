import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {  withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
