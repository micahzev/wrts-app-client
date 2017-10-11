import React, { Component } from 'react';

import { ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Modal, Col, Button, Form , FormGroup, FormControl, ControlLabel, Alert} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/backend.css';

import {  unboundUpdateSpace } from '~/src/actions/spaces';


class EditSpace extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditSpaceModal:false,
      alertEmptyField:false,
      alertInvalidCoord:false,
    }

  }

  isInt(x) {
      return !isNaN(x) && eval(x).toString().length == parseInt(eval(x)).toString().length;
  }

  isFloat(x) {
    return !isNaN(x) && !this.isInt(eval(x)) && x.toString().length > 0;
    }


  editSpace(event){

    const spaceId = this.props.space.spaceId;

    const spaceIndex = this.props.space.index;

    const spaceData = {
      spaceName:this.spaceName.value,
      spaceAddress:this.spaceAddress.value,
      spaceUrl:this.spaceUrl.value,
      spaceId:spaceId,
      index:spaceIndex,
      spaceLat:this.spaceLat.value,
      spaceLong:this.spaceLong.value,
    };

    if (spaceData.spaceName == '' || spaceData.spaceAddress == ''
        || spaceData.spaceUrl == '' || spaceData.spaceLat == '' || spaceData.spaceLong == '' ) {
      this.handlealertEmptyFieldShow();
      return;
    } else if ( !this.isFloat(spaceData.spaceLat) || !this.isFloat(spaceData.spaceLong) ) {
      this.handlealertInvalidCoordShow();
      return;
    } else {

      this.props.boundUpdateSpace(spaceData);
    }

    this.closeEditSpaceModal();
  }

  editSpaceModal() {
    this.setState({showEditSpaceModal:true});
  }

  closeEditSpaceModal(){
    this.setState({showEditSpaceModal:false});
  }


    handlealertEmptyFieldShow(){
      this.setState({
        alertEmptyField:true
      })
    }


  handlealertEmptyFieldDismiss(){
    this.setState({
      alertEmptyField:false
    })
  }


    handlealertInvalidCoordShow() {
      this.setState({
        alertInvalidCoord:true
      })
    }


    handlealertInvalidCoordDismiss() {
      this.setState({
        alertInvalidCoord:false
      })
    }


  render() {

    const space = this.props.space;

    const tooltip = (
      <Tooltip id="tooltip">Click here change your space information.</Tooltip>
    );

    return (
      <div >
        <h2>
        Space Data:
        </h2>
        <ListGroup >
          <OverlayTrigger placement="bottom" overlay={tooltip} delay={0}>
            <ListGroupItem  onClick={this.editSpaceModal.bind(this)} header={space.spaceName}>
              <span>
                <br/>
                <div><b>Address:</b> {space.spaceAddress} </div>
                <br/>
                <div><b>Site:</b>  {space.spaceUrl} </div>
                <br/>
                <div><b>Latitude:</b> {space.spaceLat} </div>
                <br/>
                <div><b>Longitude:</b>  {space.spaceLong} </div>
                <br/>
              </span>
            </ListGroupItem>
          </OverlayTrigger>
        </ListGroup>

        <Modal show={this.state.showEditSpaceModal} onHide={this.closeEditSpaceModal.bind(this)} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Edit {space.spaceName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ControlLabel} sm={2}>
               Name
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.spaceName = ref; }} type="text" placeholder="Name" defaultValue={space.spaceName} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalAddress">
                <Col componentClass={ControlLabel} sm={2}>
               Address
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.spaceAddress = ref; }} placeholder="Address" defaultValue={space.spaceAddress}  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalUrl">
                <Col componentClass={ControlLabel} sm={2}>
               Site
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.spaceUrl = ref; }} placeholder="Site" defaultValue={space.spaceUrl} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontaLat">
                <Col componentClass={ControlLabel} sm={2}>
                Latitude
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.spaceLat = ref; }} defaultValue={space.spaceLat} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalLong">
                <Col componentClass={ControlLabel} sm={2}>
                Longitude
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.spaceLong = ref; }} defaultValue={space.spaceLong} />
                </Col>
              </FormGroup>


              {this.state.alertEmptyField ?
                <Alert bsStyle="danger" onDismiss={this.handlealertEmptyFieldDismiss.bind(this)}>
                  <p>All fields must be filled out</p>
                </Alert> : null}
                {this.state.alertInvalidCoord ?
                  <Alert bsStyle="danger" onDismiss={this.handlealertInvalidCoordDismiss.bind(this)}>
                    <p>Invalid Coordinate</p>
                    </Alert> : null}


            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeEditSpaceModal.bind(this)}>Close</Button>
            <Button bsStyle="primary" onClick={this.editSpace.bind(this)}>Save changes</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }

}


function mapStateToProps(state) {
  return {};
}


function mapDispatchToProps(dispatch) {
  return {
    boundUpdateSpace: bindActionCreators(unboundUpdateSpace, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSpace);
