import React from 'react';
import { Route } from 'react-router';

import { removeErrorsFromForm } from './redirects';

import DirectionsDetail from 'directions/detail/DirectionsDetail';
import DirectionsForm from 'directions/form/DirectionsForm';

export default (
  <Route path="directions">
    <Route component={DirectionsForm} path="new" onLeave={removeErrorsFromForm}/>
    <Route component={DirectionsDetail} path=":id"/>
    <Route component={DirectionsForm} path=":id/edit" onLeave={removeErrorsFromForm}/>
  </Route>
);
