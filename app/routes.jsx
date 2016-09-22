import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

import { redirectFromRoot } from 'routes/redirects';

import App from 'App.js';
import RootDashboard from 'root/dashboard/RootDashboard';
import Users from 'routes/Users';
import SignIn from 'authorization/SignIn';
import SignUp from 'authorization/SignUp';
import UserLayout from 'user/layout/UserLayout';
import UserProfile from 'user/profile/UserProfile';

import { Provider } from 'react-redux';

import store from './store';

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/sign_in" component={SignIn} />
        <Route path="/sign_up" component={SignUp} />

        <Route path="/" component={RootDashboard} onEnter={redirectFromRoot} />

        <Route path="/profile" component={UserLayout}>
          <IndexRoute component={UserProfile} />
        </Route>

        {Users}
      </Route>
    </Router>
  </Provider>
);
