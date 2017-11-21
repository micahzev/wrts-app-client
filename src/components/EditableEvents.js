import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Glyphicon,
  ButtonToolbar,
  Button,
  Modal,
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Alert } from 'react-bootstrap';

import Confirm from 'react-confirm-bootstrap';

import update from 'immutability-helper';

import { Loader } from 'react-loaders';

import { unboundAddEvent, unboundDeleteEvent, unboundUpdateEvent } from '~/src/actions/events';

import '../styles/backend.css';
import '../styles/table.css';
import '../styles/loaderbackend.scss';

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
      loading:false,
    }
  }

  rowGetter(i) {

    const rows = this.props.events ? this.props.events : [];
    return rows[i];
  }

  onRowsSelected(rows) {

    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map((r) => r.rowIdx))});

  }

  onRowsDeselected(rows) {
    let rowIndexes = rows.map((r) => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter((i) => rowIndexes.indexOf(i) === -1 )});

  }

  async handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.props.events.slice();

    const updaterFunction = this.props.boundUpdateEvent;

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;

      if (this.isValidateUpdateObject(updatedRow)) {
        this.setState({
          loading:true,
        });
        await updaterFunction(updatedRow);
        this.setState({
          loading:false,
        });
      } else {
        return;
      }

    }

  }

  isValidateUpdateObject(updateObject){

    const regexer =  /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    const dateregexer = /^(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])\-\d{4}$/;

    if (  updateObject.eventStartDate  == '' ||
          updateObject.eventEndDate    == '' ||
          updateObject.eventArtist     == '' ||
          updateObject.eventExposition == '' ||
          updateObject.eventStartTime  == '' ||
          updateObject.eventEndTime    == ''  ||
          updateObject.eventExtraInfo == '' ||
          updateObject.eventContact  == '' ||
          updateObject.eventFacebook    == '') {
      alert('Invalid. The Field Is Empty.');
      return false;
    } else if  ( !dateregexer.test(updateObject.eventEndDate) ||
                 !dateregexer.test(updateObject.eventStartDate) ) {
      alert('Invalid Date. Format: DD-MM-YYYY');
      return false;
    } else if (!regexer.test(updateObject.eventStartTime) ||
               !regexer.test(updateObject.eventEndTime)) {
      alert('Invalid Time. Format: HH:MM');
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

    const startDateTest = this.eventStartDateYear.value+'-'+this.eventStartDateMonth.value+'-'+this.eventStartDateDay.value;
    const realStartDate = this.eventStartDateDay.value+'-'+this.eventStartDateMonth.value+'-'+this.eventStartDateYear.value;

    const endDateTest = this.eventEndDateYear.value+'-'+this.eventEndDateMonth.value+'-'+this.eventEndDateDay.value;
    const realEndDate = this.eventEndDateDay.value+'-'+this.eventEndDateMonth.value+'-'+this.eventEndDateYear.value;

    const eventData = {
      eventStartDate:realStartDate,
      eventEndDate:realEndDate,
      eventArtist:this.eventArtist.value,
      eventExposition:this.eventExposition.value,
      eventStartTime:this.eventStartTimeHour.value+':'+this.eventStartTimeMinute.value,
      eventEndTime:this.eventEndTimeHour.value+':'+this.eventEndTimeMinute.value,
      spaceId:this.props.space.spaceId,
      eventExtraInfo:this.eventExtraInfo.value,
      eventContact:this.eventContact.value,
      eventFacebook:this.eventFacebook.value
    }

    const timeRegex =  /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    if (eventData.eventStartDate == '' || eventData.eventEndDate    == '' ||
        eventData.eventArtist    == '' || eventData.eventExposition == '' ||
        eventData.eventStartTime == '' || eventData.eventEndTime    == '' ||
        eventData.eventExtraInfo == '' || eventData.eventContact    == '' ||
        eventData.eventFacebook  == '') {

      this.handleAlertEmptyFieldShow();

      return;

    } else if  ( isNaN(Date.parse(startDateTest)) || isNaN(Date.parse(endDateTest)) ) {

      this.handleAlertInvalidDateShow();

      return;

    } else if ( !timeRegex.test(eventData.eventStartTime) || ! timeRegex.test(eventData.eventEndTime) ) {

      this.handleAlertInvalidTimeShow();

      return;

    } else {

      this.props.boundAddEvent(eventData);

    }

    this.closeAddEventModal();

  }

  handleAlertEmptyFieldDismiss(){
    this.setState({
      alertEmptyField:false
    });

  }

  handleAlertEmptyFieldShow(){
    this.setState({
      alertEmptyField:true
    });

  }

  handleAlertInvalidDateShow(){
    this.setState({
      alertInvalidDate:true
    });

  }

  handleAlertInvalidDateDismiss(){
    this.setState({
      alertInvalidDate:false
    });
  }

  handleAlertInvalidTimeShow(){
    this.setState({
      alertInvalidTime:true
    });
  }

  handleAlertInvalidTimeDismiss(){
    this.setState({
      alertInvalidTime:false
    });
  }

  async onConfirm() {
    const events = this.props.events;

    const toDelete = [];

    const deleteFunction = this.props.boundDeleteEvent;

    this.state.selectedIndexes.forEach( function(element) {
      const delObj = events[element];
      toDelete.push(delObj);
    }
    )

    this.setState({
      loading:true,
    });
    await toDelete.forEach(function(elem) {
      deleteFunction(elem);
    })

    this.setState({
      selectedIndexes:[],
      loading:false,
    });
  }

  render() {

    const columns = [
      { key: 'eventStartDate', name: 'Start Date',editable: true },
      { key: 'eventEndDate', name: 'End Date',editable: true },
      { key: 'eventArtist', name: 'Artiste',editable: true },
      { key: 'eventExposition', name: 'Exposition',editable: true },
      { key: 'eventStartTime', name: 'Start Time',editable: true },
      { key: 'eventEndTime', name: 'End Time',editable: true },
      { key: 'eventExtraInfo', name: 'Extra Text',editable: true },
      { key: 'eventContact', name: 'Contact',editable: true },
      { key: 'eventFacebook', name: 'Facebook Event Link',editable: true },
    ];

    const rows = this.props.events ? this.props.events : [];

    const selectedIndexes = this.state.selectedIndexes;

    const disableDelete = selectedIndexes.length > 0 ? false : true;

    const toDeleteObjects = this.props.events.filter(function(elem, idx){
      return selectedIndexes.includes(idx);
    });

    const toDelete = toDeleteObjects.map(function(elem) {return elem.eventExposition + ' ';});

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

        {this.state.loading?
          <div className="loader-case">
            <Loader className="loader" type="semi-circle-spin" active />
          </div>
          :
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
            }}  />}

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
                  <FormControl inputRef={(ref) => { this.eventStartDateDay = ref; }} type="text" placeholder="DD" />
                </Col>

                <Col sm={2}>
                  <FormControl inputRef={(ref) => { this.eventStartDateMonth = ref; }} type="text" placeholder="MM" />
                </Col>

                <Col sm={2}>
                  <FormControl inputRef={(ref) => { this.eventStartDateYear = ref; }} type="text" placeholder="YYYY" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEndDate">
                <Col componentClass={ControlLabel} sm={2}>
              End Date
                </Col>
                <Col sm={2}>
                  <FormControl inputRef={(ref) => { this.eventEndDateDay = ref; }} type="text" placeholder="DD" />
                </Col>

                <Col sm={2}>
                  <FormControl inputRef={(ref) => { this.eventEndDateMonth = ref; }} type="text" placeholder="MM" />
                </Col>

                <Col sm={2}>
                  <FormControl inputRef={(ref) => { this.eventEndDateYear = ref; }} type="text" placeholder="YYYY" />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalArtiste">
                <Col componentClass={ControlLabel} sm={2}>
                          Artiste
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.eventArtist = ref; }} type="text" placeholder="Artist" />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalExposition">
                <Col componentClass={ControlLabel} sm={2}>
                Exposition
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.eventExposition = ref; }} type="text" placeholder="Exposition" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalStartTime">
                <Col componentClass={ControlLabel} sm={2}>
                Start Time
                </Col>
                <Col sm={2}>
                  <FormControl inputRef={(ref) => { this.eventStartTimeHour = ref; }} type="text" placeholder="HH" />
                </Col>

                <Col sm={2}>
                  <FormControl inputRef={(ref) => { this.eventStartTimeMinute = ref; }} type="text" placeholder="MM" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEndTime">
                <Col componentClass={ControlLabel} sm={2}>
                End Time
                </Col>
                <Col sm={2}>
                  <FormControl inputRef={(ref) => { this.eventEndTimeHour = ref; }} type="text" placeholder="HH" />
                </Col>

                <Col sm={2}>
                  <FormControl inputRef={(ref) => { this.eventEndTimeMinute = ref; }} type="text" placeholder="MM" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalExtraInfo">
                <Col componentClass={ControlLabel} sm={2}>
                Extra Text
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.eventExtraInfo = ref; }} type="text" placeholder="Extra Text" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalContact">
                <Col componentClass={ControlLabel} sm={2}>
                Contact
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.eventContact = ref; }} type="text" placeholder="Contact" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalFacebook">
                <Col componentClass={ControlLabel} sm={2}>
                Facebook Event Link
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => { this.eventFacebook = ref; }} type="text" placeholder="Facebook Link" />
                </Col>
              </FormGroup>
              {this.state.alertEmptyField ?
                <Alert bsStyle="danger" onDismiss={this.handleAlertEmptyFieldDismiss.bind(this)}>
                  <p>All fields must be filled out</p>
                </Alert> : null}

              {this.state.alertInvalidDate ?
                <Alert bsStyle="danger" onDismiss={this.handleAlertInvalidDateDismiss.bind(this)}>
                  <p>Invalid Date</p>
                </Alert> : null}

              {this.state.alertInvalidTime ?
                <Alert bsStyle="danger" onDismiss={this.handleAlertInvalidTimeDismiss.bind(this)}>
                  <p>Invalid Time</p>
                </Alert> : null}
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
