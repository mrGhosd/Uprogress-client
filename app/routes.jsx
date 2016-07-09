import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// let history = browserHistory;

import RootApp from 'root/app/RootApp';
import App from 'App.js';
import DirectionsList from 'directions/list/DirectionsList';
import DirectionsDetail from 'directions/detail/DirectionsDetail';

import { Provider } from 'react-redux';
import store, { history } from './store';

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={DirectionsList} />
        <Route path="/directions/:id" component={DirectionsDetail}></Route>
      </Route>
    </Router>
  </Provider>
);
