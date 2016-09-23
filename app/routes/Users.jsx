import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import RootIndex from 'root/index/RootIndex';
import Dashboard from 'dashboard/Dashboard';
import Directions from 'routes/Directions';
import UserInfo from 'user/info/UserInfo';
import UserShared from 'user/shared/UserShared';
import UserStatistic from 'user/statistic/UserStatistic';

import { updateUserInfo } from 'routes/redirects';

export default (
  <Route path="/:user" component={RootIndex}>
    <IndexRedirect to="info" />

    <Route component={Dashboard} onEnter={updateUserInfo}>
      <Route path="info" component={UserInfo} />
      <Route path="shared" component={UserShared} />
      <Route path="statistic" component={UserStatistic} />
    </Route>

    {Directions}
  </Route>
);
