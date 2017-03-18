import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import directions from './directions';
import steps from './steps';
import users from './users';
import loaders from './loaders';
import notifications from './notifications';
import base from './base';

const rootReducer = combineReducers({
  directions,
  steps,
  users,
  loaders,
  notifications,
  base,
  routing: routerReducer
});

export default rootReducer;
