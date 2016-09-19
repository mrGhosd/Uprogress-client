import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import directions from './directions';
import steps from './steps';
import users from './users';

const rootReducer = combineReducers({
  directions,
  steps,
  users,
  routing: routerReducer
});

export default rootReducer;
