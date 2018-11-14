import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import Auth from './containers/Auth';
import ProperRouter from './containers/AuthRouter';
import App from './containers/App';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Users from './containers/Users';
import Profile from './containers/Profile';
import Logout from './containers/Logout';

import { Provider } from 'react-redux';

const Routes = ({ store }) => {
  return(
    <Provider store={store}>
      <Auth>
        <BrowserRouter >
          <div>
            <Route path="/:currentPath" component={ ProperRouter } />
            <Route exact path="/" component={ App } />
            <Route exact path="/users" component={ Users } />
            <Route path="/users/:id" component={ Profile }/>
            <Route exact path="/logout" component={ Logout } />
          </div>
        </BrowserRouter>
      </Auth>
    </Provider>
  );
}

export default Routes;
