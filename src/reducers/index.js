import spaces from './spaces';
import events from './events';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  spaces: spaces,
  events: events,
});

export default rootReducer;
