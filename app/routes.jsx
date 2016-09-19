import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'App.js';
import Dashboard from 'dashboard/Dashboard';
import Directions from 'routes/Directions';
import SignIn from 'authorization/SignIn';
import SignUp from 'authorization/SignUp';

import { Provider } from 'react-redux';
import store from './store';

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/sign_in" component={SignIn} />
      <Route path="/sign_up" component={SignUp} />
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        {Directions}
      </Route>
    </Router>
  </Provider>
);
