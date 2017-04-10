import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import { removeErrorsFromForm } from './redirects';

import DirectionsDetail from 'directions/detail/DirectionsDetail';
import DirectionsForm from 'directions/form/DirectionsForm';
import StepsList from 'steps/list/StepsList';

export default (
  <Route path="directions">
    <Route component={DirectionsForm} path="new" onLeave={removeErrorsFromForm}/>
    <Route component={DirectionsDetail} path=":id">
      <IndexRedirect to="steps" />
      <Route component={StepsList} path="steps" />
    </Route>
    <Route component={DirectionsForm} path=":id/edit" onLeave={removeErrorsFromForm}/>
  </Route>
);
