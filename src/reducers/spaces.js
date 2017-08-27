import * as types from '../constants/ActionTypes';

export default(state = [], action) => {
    switch (action.type) {
        case types.FETCH_SPACES_FULFILLED:
          return action.payload;
        case types.ADD_SPACE_FULFILLED:
            return [...state, action.payload];
        case types.DELETE_SPACE_FULFILLED:
          return [
            ...state.slice(0, action.payload.index),
            ...state.slice(action.payload.index + 1)
          ];
          case types.UPDATE_SPACE_FULFILLED:
            return [
              ...state.slice(0, action.payload.index),
              action.payload,
              ...state.slice(action.payload.index + 1)
            ];
        default:
            return state;
    }
};
