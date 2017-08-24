import spaces from './spaces';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  spaces: spaces
});

export default rootReducer;
