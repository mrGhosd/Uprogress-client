import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import directions from './directions';

const rootReducer = combineReducers({
  directions,
  routing: routerReducer
});

export default rootReducer;
