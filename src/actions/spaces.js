import * as types from '../constants/ActionTypes';
import { fetchSpacesAPI } from '~/src/helpers/ClientAPI';

export function fetchSpaces(options) {
    return {
      type: types.FETCH_SPACES,
      payload: {
        promise: fetchSpacesAPI()
      }
    }
  };
