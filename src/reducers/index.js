import spaces from './spaces';
import events from './events';
import text from './text';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  spaces: spaces,
  events: events,
  text:text,
});

export default rootReducer;
