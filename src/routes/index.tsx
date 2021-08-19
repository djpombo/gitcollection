import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard';
import { Repo } from '../pages/Repo';


export const Routes: React.FC = () =>  {
  return (
    
      <Switch>
          <Route component={Dashboard} path="/" exact />
          <Route component={Repo} path="/repositories"/>
      </Switch>
  
  );
};


