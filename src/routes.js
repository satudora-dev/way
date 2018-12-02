import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import Auth from './containers/Auth';
import ProperRouter from './containers/ProperRouter';
import Users from './containers/Users';
import Profile from './containers/Profile';
import Project from './containers/Project';
import Projects from './containers/Projects';
import Logout from './containers/Logout';

import { Provider } from 'react-redux';

const Routes = ({ store }) => {
  return(
    <Provider store={store}>
      <Auth>
        <BrowserRouter >
          <div>
            <Route path="/:currentPath?" component={ ProperRouter } />
            <Route exact path="/users" component={ Users } />
            <Route exact path="/projects" component={ Projects }/>
            <Route path="/users/:id" component={ Profile }/>
            <Route path="/projects/:id" component={ Project }/>
            <Route exact path="/logout" component={ Logout } />
          </div>
        </BrowserRouter>
      </Auth>
    </Provider>
  );
}

export default Routes;
