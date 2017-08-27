import React, { Component } from 'react';

import { ListGroup, ListGroupItem, Tooltip, OverlayTrigger, Modal, Col, Button, Form , FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/backend.css';

import {  unboundUpdateSpace } from '~/src/actions/spaces';


class EditSpace extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditSpaceModal:false,
      alertEmptyField:false
    }

  }

  editSpace(event){

        const spaceId = this.props.space.spaceId;

        const spaceIndex = this.props.space.index;

         const spaceData = {
           spaceName:this.spaceName.value,
           spaceAddress:this.spaceAddress.value,
           spaceUrl:this.spaceUrl.value,
           spaceId:spaceId,
           index:spaceIndex
         };

         if (spaceData.spaceName == "" || spaceData.spaceAddress == "" || spaceData.spaceUrl == "") {
           this.handlealertEmptyFieldShow()
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


  handlealertEmptyFieldDismiss(){
    this.setState({
      alertEmptyField:false
    })
  }

  render() {

    const space = this.props.space;

    const tooltip = (
        <Tooltip id="tooltip">Click here change your space information.</Tooltip>
      );

    return (
      <div className="Backend">
      <h2>
        Space Data:
      </h2>
        <ListGroup >
        <OverlayTrigger placement="bottom" overlay={tooltip} delay={0}>
         <ListGroupItem  onClick={this.editSpaceModal.bind(this)} header={space.spaceName}>
         <span>
          <div><b>Address:</b> {space.spaceAddress}</div>
          <div><b>Site:</b>  {space.spaceUrl}</div>

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
               <FormControl inputRef={ref => { this.spaceName = ref; }} type="text" placeholder="Name" defaultValue={space.spaceName} />
             </Col>
           </FormGroup>

           <FormGroup controlId="formHorizontalAddress">
             <Col componentClass={ControlLabel} sm={2}>
               Address
             </Col>
             <Col sm={10}>
               <FormControl inputRef={ref => { this.spaceAddress = ref; }} placeholder="Address" defaultValue={space.spaceAddress}  />
             </Col>
           </FormGroup>

           <FormGroup controlId="formHorizontalUrl">
             <Col componentClass={ControlLabel} sm={2}>
               Site
             </Col>
             <Col sm={10}>
               <FormControl inputRef={ref => { this.spaceUrl = ref; }} placeholder="Site" defaultValue={space.spaceUrl} />
             </Col>

           </FormGroup>
           { this.state.alertEmptyField ?
           <Alert bsStyle="danger" onDismiss={ this.handlealertEmptyFieldDismiss.bind(this) }>
             <p>All fields must be filled out</p>
           </Alert> : null }


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
