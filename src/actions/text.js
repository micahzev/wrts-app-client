import * as types from '../constants/ActionTypes';
import { fetchTextAPI, updateTextAPI } from '../helpers/ClientApi';

export function fetchText(options) {
  return {
    type: types.FETCH_TEXT,
    payload: {
      promise: fetchTextAPI()
    }
  }
};

export function unboundUpdateText(data) {
  return {
    type: types.UPDATE_TEXT,
    payload: {
      promise: updateTextAPI(data)
    }
  }
};
