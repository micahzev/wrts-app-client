import * as types from '../constants/ActionTypes';

export default(state = [], action) => {
  switch (action.type) {
    case types.FETCH_TEXT_FULFILLED:
      return action.payload;
    case types.UPDATE_TEXT_FULFILLED:
      return [
        ...state.slice(0, action.payload.index),
        action.payload,
        ...state.slice(action.payload.index + 1)
      ];
    default:
      return state;
  }
};
