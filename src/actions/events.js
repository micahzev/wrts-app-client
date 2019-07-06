import * as types from '../constants/ActionTypes';
import { fetchEventsAPI,  addEventAPI, deleteEventAPI, updateEventAPI  } from '../helpers/ClientAPI';

export function fetchEvents(options) {
  return {
    type: types.FETCH_EVENTS,
    payload: {
      promise: fetchEventsAPI()
    }
  }
};

export function unboundAddEvent(data) {
  return {
    type: types.ADD_EVENT,
    payload: {
      promise: addEventAPI(data)
    }
  }
};

export function unboundDeleteEvent(data) {
  return {
    type: types.DELETE_EVENT,
    payload: {
      promise: deleteEventAPI(data)
    }
  }
};

export function unboundUpdateEvent(data) {
  return {
    type: types.UPDATE_EVENT,
    payload: {
      promise: updateEventAPI(data)
    }
  }
};
