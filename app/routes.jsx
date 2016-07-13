import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import RootApp from 'root/app/RootApp';
import App from 'App.js';
import Dashboard from 'dashboard/Dashboard';
import DirectionsList from 'directions/list/DirectionsList';
import DirectionsDetail from 'directions/detail/DirectionsDetail';
import Directions from 'routes/Directions';

import { Provider } from 'react-redux';
import store, { history } from './store';

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        {Directions}
      </Route>
    </Router>
  </Provider>
);
