import * as types from '../constants/ActionTypes';

export default(state = [], action) => {
  switch (action.type) {
    case types.FETCH_EVENTS_FULFILLED:
      return action.payload;
    case types.ADD_EVENT_FULFILLED:
      return [...state, action.payload];
    case types.DELETE_EVENT_FULFILLED:
      return [
        ...state.slice(0, action.payload.index),
        ...state.slice(action.payload.index + 1)
      ];
    case types.UPDATE_EVENT_FULFILLED:
      return [
        ...state.slice(0, action.payload.index),
        action.payload,
        ...state.slice(action.payload.index + 1)
      ];
    default:
      return state;
  }
};
