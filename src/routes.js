import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import Auth from './containers/Auth';
import ProperRouter from './containers/ProperRouter';
import Users from './containers/Users';
import Profile from './containers/Profile';
import Project from './containers/Project';
import ProjectList from './containers/ProjectList';
import Logout from './containers/Logout';
import  GithubReports from './components/githubReports';

import { Provider } from 'react-redux';

const Routes = ({ store }) => {
  return(
    <Provider store={store}>
      <Auth>
        <BrowserRouter >
          <div>
            <Route path="/:currentPath?" component={ ProperRouter } />
            <Route exact path="/users" component={ Users } />
            <Route exact path="/projects" component={ ProjectList }/>
            <Route path="/users/:id" component={ Profile }/>
            <Route path="/projects/:id" component={ Project }/>
            <Route exact path="/logout" component={ Logout } />
            <Route exact path="/report" component={ GithubReports } />
          </div>
        </BrowserRouter>
      </Auth>
    </Provider>
  );
}

export default Routes;
