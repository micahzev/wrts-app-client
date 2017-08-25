import * as types from '../constants/ActionTypes';
import { fetchEventsAPI } from '~/src/helpers/ClientAPI';

export function fetchEvents(options) {
    return {
      type: types.FETCH_EVENTS,
      payload: {
        promise: fetchEventsAPI()
      }
    }
  };
