import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'App.js';
import RootIndex from 'root/index/RootIndex';
import Dashboard from 'dashboard/Dashboard';
import RootDashboard from 'root/dashboard/RootDashboard';
import Directions from 'routes/Directions';
import SignIn from 'authorization/SignIn';
import SignUp from 'authorization/SignUp';

import { Provider } from 'react-redux';
import store from './store';

/**
 * Redirect from root path if user not signed in
 * @param  {Object} nextState state of the router
 * @param  {Function} replace helps to replace the route path
 * @param  {Function} callback make a callback after onEnter hook
 * @return {Dispatch} Dispatch function
 */
function redirectFromRoot(nextState, replace, callback) {
  const storeContent = store.getState();

  if (storeContent.users.current.isEmpty) {
    replace('/sign_in');
  }
  callback();
}

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/sign_in" component={SignIn} />
        <Route path="/sign_up" component={SignUp} />
          <Route path="/" component={RootDashboard} onEnter={redirectFromRoot} />
          <Route path="/:user" component={RootIndex}>
            <IndexRoute component={Dashboard} />
            {Directions}
          </Route>

      </Route>
    </Router>
  </Provider>
);
