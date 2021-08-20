import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard';
import { Repo } from '../pages/Repo';


export const Routes: React.FC = () =>  {
  return (
    
      <Switch>
          <Route component={Dashboard} path="/" exact />
          {/* este "+" é uma gambi pq o full_name tem uma "/" entao o router acha q tem mais um subdiretorio
          assim ele nao pega mais este subdiretorio, é um implemento pontual desta aplicação */}
          <Route component={Repo} path="/repositories/:repository+"/> 
      </Switch>
  
  );
};


