import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Glyphicon, ButtonToolbar, Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel, Alert } from 'react-bootstrap';

import Confirm from 'react-confirm-bootstrap';

import update from 'immutability-helper';

import { unboundUpdateText } from '~/src/actions/text';

import '../styles/backend.css';



class EditableText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    }
  }



  componentDidUpdate(prevProps){
    if (prevProps.text.length < 1) {
      this.setState({
        text: this.props.text,
      })
    }
  }

  handleChange(e) {
      this.setState({ text: e.target.value });
  }


  onConfirm(){
      console.log(this.state.text);
      const textData = {
        aboutText:this.state.text
      };
      this.props.boundUpdateText(textData);
  }

  render() {

    return (
      <div>
        <h2>
        Edit About Text
        </h2>

        <FormGroup controlId="formControlsTextarea">
           <FormControl componentClass="textarea" className="editableText"
           value={this.state.text}
           onChange={this.handleChange.bind(this)}
            />
         </FormGroup>

         <Confirm
           onConfirm={this.onConfirm.bind(this)}
           body={this.state.text}
           confirmText="Confirm Change About Text"
           title="Are you sure you want to change the about text?">
           <Button bsStyle="primary" >Click To Edit About Text!</Button>
         </Confirm>

      </div>
    );
  }

}

function mapStateToProps(state) {
  return {};
}
;

function mapDispatchToProps(dispatch) {
  return {
    boundUpdateText: bindActionCreators(unboundUpdateText, dispatch),
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(EditableText);
