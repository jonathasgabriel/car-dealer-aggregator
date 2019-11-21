import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import CarSearch from '../pages/CarSearch';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={CarSearch} />
      <Route path="/" component={() => <h1>404 - Page not found</h1>} />
    </Switch>
  );
}
