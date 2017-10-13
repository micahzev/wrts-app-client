import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Glyphicon, ButtonToolbar, Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel, Alert } from 'react-bootstrap';

import Confirm from 'react-confirm-bootstrap';

import update from 'immutability-helper';

import { unboundAddSpace, unboundDeleteSpace, unboundUpdateSpace } from '~/src/actions/spaces';
import { unboundDeleteEvent } from '~/src/actions/events';


import '../styles/table.css';


class EditableSpaces extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndexes: [],
      showAddSpaceModal:false,
      alertEmptyField:false,
      toDelete:[],
      alertInvalidCoord:false,

    }
  }


  rowGetter(i) {

    const rows = this.props.spaces ? this.props.spaces : [];
    return rows[i];
  }

  onRowsSelected(rows) {

    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map((r) => r.rowIdx))});

  }

  onRowsDeselected(rows) {
    let rowIndexes = rows.map((r) => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter((i) => rowIndexes.indexOf(i) === -1 )});

  }

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.props.spaces.slice();

    const updaterFunction = this.props.boundUpdateSpace;

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
      updatedRow.index = i;
      updaterFunction(updatedRow);
    }


  }


  showModal() {
    this.setState({
      showAddSpaceModal:true
    })
  }

  closeAddSpaceModal() {
    this.setState({
      showAddSpaceModal:false
    })
  }

  isInt(x) {
      return !isNaN(x) && eval(x).toString().length == parseInt(eval(x)).toString().length;
  }

  isFloat(x) {
    return !isNaN(x) && !this.isInt(eval(x)) && x.toString().length > 0;
    }

  addNewSpace (event) {

    const spaceData = {
      spaceName:this.spaceName.value,
      spaceAddress:this.spaceAddress.value,
      spaceUrl:this.spaceUrl.value,
      spaceLat:this.spaceLat.value,
      spaceLong:this.spaceLong.value,
    }
    // add validation of lat long
    if (spaceData.spaceName == '' || spaceData.spaceAddress == ''
        || spaceData.spaceUrl == '' || spaceData.spaceLat == '' || spaceData.spaceLong == '' ) {
      this.handlealertEmptyFieldShow()
      return;
    } else if ( !this.isFloat(spaceData.spaceLat) || !this.isFloat(spaceData.spaceLong) ) {
      this.handlealertInvalidCoordShow();
      return;
    } else {
      this.props.boundAddSpace(spaceData);
    }

    this.closeAddSpaceModal();

  }

  handlealertEmptyFieldDismiss(){
    this.setState({
      alertEmptyField:false
    })
  }

  handlealertEmptyFieldShow(){
    this.setState({
      alertEmptyField:true
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


  onConfirm() {
    const spaces = this.props.spaces;

    const toDelete = [];

    this.deleteSpaceFunction = this.props.boundDeleteSpace;

    this.deleteEventFunction = this.props.boundDeleteEvent;

    const events = this.props.events;

    this.state.selectedIndexes.forEach( function(element) {
      const delObj = spaces[element];
      delObj.index = element;
      toDelete.push(delObj);
    }
    )

    toDelete.forEach(function(elem) {
      this.deleteSpaceFunction(elem);
      const eventsToDelete = events.filter(event => event.spaceId == elem.spaceId);

      if (eventsToDelete.length > 0) {
          const eventsToDeleteWithIndex = eventsToDelete.map((event) => {
          event.index = events.indexOf(event);
          return event;
        })

        eventsToDeleteWithIndex.forEach(function(eventElem) {
          this.deleteEventFunction(eventElem);
        }, this);

      }

    }, this);

    this.setState({
      selectedIndexes:[],
    });


  }


  render() {

    const columns = [
      { key: 'spaceName', name: 'Name',editable: true },
      { key: 'spaceAddress', name: 'Address',editable: true },
      { key: 'spaceUrl', name: 'Site',editable: true },
      { key: 'spaceLat', name: 'Latitude',editable: true },
      { key: 'spaceLong', name: 'Longitude',editable: true }, ];

    const rows = this.props.spaces ? this.props.spaces : [];

    const selectedIndexes = this.state.selectedIndexes;

    const disableDelete = selectedIndexes.length > 0 ? false : true;

    const toDeleteObjects = this.props.spaces.filter(function(elem, idx){
      return selectedIndexes.includes(idx);
    })

    const toDelete = toDeleteObjects.map(function(elem) {return elem.spaceName + ' ';});


    return (
      <div>
        <h2>
        Add, Edit Delete Spaces
        </h2>
        <ButtonToolbar>
          <Button bsStyle="info" onClick={this.showModal.bind(this)}>Add New Space</Button>
          <Confirm
            onConfirm={this.onConfirm.bind(this)}
            body={toDelete}
            confirmText="Confirm Delete"
            title="Are you sure you want to delete?">
            <Button bsStyle="danger" disabled={disableDelete}>Delete Selected</Button>
          </Confirm>


        </ButtonToolbar>
        <ReactDataGrid
          enableCellSelect
          enableDragAndDrop={false}
          columns={columns}
          rowGetter={this.rowGetter.bind(this)}
          rowsCount={rows.length}
          minHeight={500}
          onGridRowsUpdated={this.handleGridRowsUpdated.bind(this)}
          rowSelection={{
            showCheckbox: true,
            onRowsSelected: this.onRowsSelected.bind(this),
            onRowsDeselected: this.onRowsDeselected.bind(this),
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }}  />


        <Modal show={this.state.showAddSpaceModal} onHide={this.closeAddSpaceModal.bind(this)} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Add a New Space</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ControlLabel} sm={2}>
                Name
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.spaceName = ref; }} type="text" placeholder="Name" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalAddress">
                <Col componentClass={ControlLabel} sm={2}>
                Address
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.spaceAddress = ref; }} placeholder="Address" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalUrl">
                <Col componentClass={ControlLabel} sm={2}>
                Site
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.spaceUrl = ref; }} placeholder="Site" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontaLat">
                <Col componentClass={ControlLabel} sm={2}>
                Latitude
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.spaceLat = ref; }} placeholder="Latitude" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalLong">
                <Col componentClass={ControlLabel} sm={2}>
                Longitude
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.spaceLong = ref; }} placeholder="Longitude" />
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
            <Button onClick={this.closeAddSpaceModal.bind(this)}>Close</Button>
            <Button bsStyle="primary" onClick={this.addNewSpace.bind(this)}>Save changes</Button>
          </Modal.Footer>
        </Modal>
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
    boundAddSpace: bindActionCreators(unboundAddSpace, dispatch),
    boundDeleteSpace: bindActionCreators(unboundDeleteSpace, dispatch),
    boundUpdateSpace: bindActionCreators(unboundUpdateSpace, dispatch),
    boundDeleteEvent: bindActionCreators(unboundDeleteEvent, dispatch),

  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(EditableSpaces);
