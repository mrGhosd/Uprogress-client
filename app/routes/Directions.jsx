import React from 'react';
import { Router, Route } from 'react-router'

import DirectionsDetail from 'directions/detail/DirectionsDetail';
import DirectionsForm from 'directions/form/DirectionsForm';

export default (
  <Route path="/directions">
    <Route component={DirectionsDetail} path=":id"/>
    <Route component={DirectionsForm} path=":id/edit"/>
  </Route>
);
