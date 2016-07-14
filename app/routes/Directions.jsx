import React from 'react';
import { Router, Route } from 'react-router'

import DirectionsDetail from 'directions/detail/DirectionsDetail';
import DirectionsForm from 'directions/form/DirectionsForm';

export default (
  <Route path="/directions">
    <Route component={DirectionsForm} path="new"/>
    <Route component={DirectionsDetail} path=":course_id"/>
    <Route component={DirectionsForm} path=":course_id/edit"/>
  </Route>
);
