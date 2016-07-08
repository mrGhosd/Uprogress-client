import { createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { hashHistory } from 'react-router'

// import the root reducer
import rootReducer from './reducers/index';

//create object for default data

const defaultState =  {
  directions: []
};

const store = createStore(rootReducer, defaultState);

const history = syncHistoryWithStore(browserHistory, store);

export default store;
