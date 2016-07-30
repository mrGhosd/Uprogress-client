import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import directions from './directions';
import steps from './steps';

const rootReducer = combineReducers({
  directions,
  steps,
  routing: routerReducer
});

export default rootReducer;
