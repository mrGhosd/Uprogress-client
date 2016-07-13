import { createStore, compse, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { hashHistory } from 'react-router'
import thunk from 'redux-thunk';

// import the root reducer
import rootReducer from './reducers/index';

//create object for default data

const defaultState =  {};


const store = applyMiddleware(thunk)(createStore)(rootReducer, defaultState, window.devToolsExtension && window.devToolsExtension());

const history = syncHistoryWithStore(browserHistory, store);

export default store;
