import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Glyphicon, ButtonToolbar, Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel, Alert } from 'react-bootstrap';

import Confirm from 'react-confirm-bootstrap';

import {BootstrapTable, TableHeaderColumn, DeleteButton} from 'react-bootstrap-table';

import update from 'immutability-helper';

import { unboundAddEvent, unboundDeleteEvent, unboundUpdateEvent } from '~/src/actions/events';

import '../styles/table.css';


class EditableEvents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndexes: [],
      showAddEventModal:false,
      alertEmptyField:false,
      alertInvalidDate:false,
      alertInvalidTime:false,
      toDelete:[],
    }
  }


  rowGetter(i) {

    const rows = this.props.events ? this.props.events : [];
   return rows[i];
  }

  onRowsSelected(rows) {

     this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});

   }

   onRowsDeselected(rows) {
     let rowIndexes = rows.map(r => r.rowIdx);
     this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});

   }

   handleGridRowsUpdated({ fromRow, toRow, updated }) {
     let rows = this.props.events.slice();

     const updaterFunction = this.props.boundUpdateEvent;

     for (let i = fromRow; i <= toRow; i++) {
       let rowToUpdate = rows[i];
       let updatedRow = update(rowToUpdate, {$merge: updated});
       rows[i] = updatedRow;

       if (this.isValidateUpdateObject(updatedRow)) {
          updaterFunction(updatedRow);
       } else {
         return;
       }


     }


   }

   isValidateUpdateObject(updateObject){

     const regexer =  /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

     const dateregexer = /^(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])\-\d{4}$/;

     if (updateObject.eventStartDate == "" ||
          updateObject.eventEndDate == "" ||
          updateObject.eventArtist == "" ||
          updateObject.eventExposition == "" ||
               updateObject.eventStartTime == "" ||
               updateObject.eventEndTime == ""  ) {
        alert("Invalid. The Field Is Empty.");
       return false;
     } else if  ( !(Date.parse(updateObject.eventEndDate)) ||
                  !(Date.parse(updateObject.eventStartDate)) ||
                  !dateregexer.test(updateObject.eventEndDate) ||
                  !dateregexer.test(updateObject.eventStartDate) ) {

       alert("Invalid Date. Format: DD-MM-YYYY");
       return false;
     } else if (!regexer.test(updateObject.eventStartTime) || ! regexer.test(updateObject.eventEndTime)) {
       alert("Invalid Time. Format: HH:MM");
       return false;

     } else {
          return true;
     }


   }


   showModal() {
     this.setState({
       showAddEventModal:true
     })
   }

   closeAddEventModal() {
     this.setState({
       showAddEventModal:false
     })
   }

   addNewEvent(event) {


     const eventData = {
       eventStartDate:this.eventStartDateDay.value+"-"+this.eventStartDateMonth.value+"-"+this.eventStartDateYear.value,
       eventEndDate:this.eventEndDateDay.value+"-"+this.eventEndDateMonth.value+"-"+this.eventEndDateYear.value,
       eventArtist:this.eventArtist.value,
       eventExposition:this.eventExposition.value,
       eventStartTime:this.eventStartTimeHour.value+":"+this.eventStartTimeMinute.value,
       eventEndTime:this.eventEndTimeHour.value+":"+this.eventEndTimeMinute.value,
       spaceId:this.props.space.spaceId,
     }

     const regexer =  /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

     if (eventData.eventStartDate == "" ||
          eventData.eventEndDate == "" ||
          eventData.eventArtist == "" ||
          eventData.eventExposition == "" ||
               eventData.eventStartTime == "" ||
               eventData.eventEndTime == ""  ) {
       this.handlealertEmptyFieldShow()
       return;
     } else if  (! Date.parse(eventData.eventEndDate) || ! Date.parse(eventData.eventStartDate)) {

       this.handlealertInvalidDateShow()
       return;
     } else if (!regexer.test(eventData.eventStartTime) || ! regexer.test(eventData.eventEndTime)) {
       this.handlealertInvalidTimeShow()
       return;

     } else {
       this.props.boundAddEvent(eventData);
     }

     this.closeAddEventModal();

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

   handlealertInvalidDateShow(){
     this.setState({
       alertInvalidDate:true
     })

   }

   handlealertInvalidDateDismiss(){
     this.setState({
       alertInvalidDate:false
     })
   }

   handlealertInvalidTimeShow(){
     this.setState({
       alertInvalidTime:true
     })

   }


   handlealertInvalidTimeDismiss(){
     this.setState({
       alertInvalidTime:false
     })

   }



   onConfirm() {
     const events = this.props.events;

     const toDelete = [];

     const deleteFunction = this.props.boundDeleteEvent;


     this.state.selectedIndexes.forEach( function(element) {
          const delObj = events[element];
          toDelete.push(delObj);
        }
     )

     toDelete.forEach(function(elem) {
       deleteFunction(elem);
     })
   }



  render() {

    const columns = [
      { key: 'eventStartDate', name: 'Start Date',editable: true },
      { key: 'eventEndDate', name: 'End Date',editable: true },
      { key: 'eventArtist', name: 'Artiste',editable: true },
      { key: 'eventExposition', name: 'Exposition',editable: true },
      { key: 'eventStartTime', name: 'Start Time',editable: true },
      { key: 'eventEndTime', name: 'End Time',editable: true }, ];

      const rows = this.props.events ? this.props.events : [];

      const selectedIndexes = this.state.selectedIndexes;

      const disableDelete = selectedIndexes.length > 0 ? false : true;

      const toDeleteObjects = this.props.events.filter(function(elem, idx){
        return selectedIndexes.includes(idx);
      })

      const toDelete = toDeleteObjects.map(function(elem) {return elem.eventExposition + " ";});


    return (
      <div>
      <h2>
        Add, Edit Delete Your Events
      </h2>
      <ButtonToolbar>
    <Button bsStyle="info" onClick={this.showModal.bind(this)}>Add New Event</Button>
    <Confirm
                onConfirm={this.onConfirm.bind(this)}
                body={toDelete}
                confirmText="Confirm Delete"
                title="Are you sure you want to delete?">
                <Button bsStyle="danger" disabled={disableDelete}>Delete Selected</Button>
            </Confirm>


  </ButtonToolbar>
      <ReactDataGrid
        enableCellSelect={true}
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


         <Modal show={this.state.showAddEventModal} onHide={this.closeAddEventModal.bind(this)} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Add a New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form horizontal>

          <FormGroup controlId="formHorizontalStartDate">
            <Col componentClass={ControlLabel} sm={2}>
              Start Date
            </Col>
            <Col sm={2}>
              <FormControl inputRef={ref => { this.eventStartDateDay = ref; }} type="text" placeholder="DD" />
            </Col>

            <Col sm={2}>
              <FormControl inputRef={ref => { this.eventStartDateMonth = ref; }} type="text" placeholder="MM" />
            </Col>

            <Col sm={2}>
              <FormControl inputRef={ref => { this.eventStartDateYear = ref; }} type="text" placeholder="YYYY" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEndDate">
            <Col componentClass={ControlLabel} sm={2}>
              End Date
            </Col>
            <Col sm={2}>
              <FormControl inputRef={ref => { this.eventEndDateDay = ref; }} type="text" placeholder="DD" />
            </Col>

            <Col sm={2}>
              <FormControl inputRef={ref => { this.eventEndDateMonth = ref; }} type="text" placeholder="MM" />
            </Col>

            <Col sm={2}>
              <FormControl inputRef={ref => { this.eventEndDateYear = ref; }} type="text" placeholder="YYYY" />
            </Col>
          </FormGroup>
                      <FormGroup controlId="formHorizontalArtiste">
                        <Col componentClass={ControlLabel} sm={2}>
                          Artiste
                        </Col>
                        <Col sm={10}>
                          <FormControl inputRef={ref => { this.eventArtist = ref; }} type="text" placeholder="Artist" />
                        </Col>
                      </FormGroup>
            <FormGroup controlId="formHorizontalExposition">
              <Col componentClass={ControlLabel} sm={2}>
                Exposition
              </Col>
              <Col sm={10}>
                <FormControl inputRef={ref => { this.eventExposition = ref; }} type="text" placeholder="Exposition" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalStartTime">
              <Col componentClass={ControlLabel} sm={2}>
                Start Time
              </Col>
              <Col sm={2}>
                <FormControl inputRef={ref => { this.eventStartTimeHour = ref; }} type="text" placeholder="HH" />
              </Col>

              <Col sm={2}>
                <FormControl inputRef={ref => { this.eventStartTimeMinute = ref; }} type="text" placeholder="MM" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEndTime">
              <Col componentClass={ControlLabel} sm={2}>
                End Time
              </Col>
              <Col sm={2}>
                <FormControl inputRef={ref => { this.eventEndTimeHour = ref; }} type="text" placeholder="HH" />
              </Col>

              <Col sm={2}>
                <FormControl inputRef={ref => { this.eventEndTimeMinute = ref; }} type="text" placeholder="MM" />
              </Col>
            </FormGroup>


            { this.state.alertEmptyField ?
            <Alert bsStyle="danger" onDismiss={ this.handlealertEmptyFieldDismiss.bind(this) }>
              <p>All fields must be filled out</p>
            </Alert> : null }

            { this.state.alertInvalidDate ?
            <Alert bsStyle="danger" onDismiss={ this.handlealertInvalidDateDismiss.bind(this) }>
              <p>Invalid Date</p>
            </Alert> : null }

            { this.state.alertInvalidTime ?
            <Alert bsStyle="danger" onDismiss={ this.handlealertInvalidTimeDismiss.bind(this) }>
              <p>Invalid Time</p>
            </Alert> : null }


            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeAddEventModal.bind(this)}>Close</Button>
            <Button bsStyle="primary" onClick={this.addNewEvent.bind(this)}>Save changes</Button>
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
    boundAddEvent: bindActionCreators(unboundAddEvent, dispatch),
    boundDeleteEvent: bindActionCreators(unboundDeleteEvent, dispatch),
    boundUpdateEvent: bindActionCreators(unboundUpdateEvent, dispatch),

  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(EditableEvents);
