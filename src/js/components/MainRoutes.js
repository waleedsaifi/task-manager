import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import TaskPage from './TaskPage';

const MainRoutes = () => (
  <Switch>

    <Route exact path="/task" component={TaskPage} />
  
    <Redirect to="/task" />
  </Switch>
);

export default MainRoutes;
