import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import directions from './directions';
import steps from './steps';
import users from './users';
import loaders from './loaders';

const rootReducer = combineReducers({
  directions,
  steps,
  users,
  loaders,
  routing: routerReducer
});

export default rootReducer;
