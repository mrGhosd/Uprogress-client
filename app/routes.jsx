import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

let history = browserHistory;

import RootApp from 'root/app/RootApp';
import DirectionsList from 'directions/list/DirectionsList';
import DirectionsDetail from 'directions/detail/DirectionsDetail';

export default (
  <Router history={history}>
    <Route component={RootApp}>
      <Route path="/" component={DirectionsList}></Route>
      <Route path="/directions/:id" component={DirectionsDetail}></Route>
    </Route>
  </Router>
);
