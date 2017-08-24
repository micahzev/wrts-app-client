import * as types from '../constants/ActionTypes';

export default(state = [], action) => {
    switch (action.type) {
        case types.FETCH_SPACES_FULFILLED:
          return action.payload;
        case 'add':
            return [...state, action.item];
        default:
            return state;
    }
};
