import React from 'react';
import { Router, Route } from 'react-router'

import DirectionsDetail from 'directions/detail/DirectionsDetail';

export default (
  <Route path="/directions">
    <Route component={DirectionsDetail} path=":id"/>
  </Route>
);
