import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { FiLoader } from 'react-icons/fi';
//import { Dashboard } from '../pages/Dashboard';
//import { Repo } from '../pages/Repo';

const Dashboard = React.lazy(()=> import('../pages/Dashboard'));
const Repo = React.lazy(()=> import('../pages/Repo'));

export const Routes: React.FC = () =>  {
  return (
    <React.Suspense fallback={<><FiLoader />'Loading...'</>}>
      <Switch>
        
          <Route component={Dashboard} path="/" exact />
          {/* este "+" é uma gambi pq o full_name tem uma "/" entao o router acha q tem mais um subdiretorio
          assim ele nao pega mais este subdiretorio, é um implemento pontual desta aplicação */}
          <Route component={Repo} path="/repositories/:repository+"/> 
          
      </Switch>
      </React.Suspense>
  
  );
};


