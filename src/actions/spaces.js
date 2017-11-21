import * as types from '../constants/ActionTypes';
import { fetchSpacesAPI, addSpaceAPI, deleteSpaceAPI, updateSpaceAPI  } from '~/src/helpers/ClientAPI';

export function fetchSpaces(options) {
  return {
    type: types.FETCH_SPACES,
    payload: {
      promise: fetchSpacesAPI()
    }
  }
};

export function unboundAddSpace(data) {
  return {
    type: types.ADD_SPACE,
    payload: {
      promise: addSpaceAPI(data)
    }
  }
};

export function unboundDeleteSpace(data) {
  return {
    type: types.DELETE_SPACE,
    payload: {
      promise: deleteSpaceAPI(data)
    }
  }
};

export function unboundUpdateSpace(data) {
  return {
    type: types.UPDATE_SPACE,
    payload: {
      promise: updateSpaceAPI(data)
    }
  }
};
