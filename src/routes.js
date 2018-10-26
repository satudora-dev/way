import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import App from './containers/App';
import Login from './containers/Login';
import Signup from './containers/Signup';
import User from './containers/User';
import Profile from './containers/Profile';
import Logout from './containers/Logout';

const Routes = () => {
  return(
    <BrowserRouter >
      <div>
        <Route exact path="/" component={ App } />
        <Route path="/signup" component={ Signup } />
        <Route exact path="/users" component={ User } />
        <Route path="/users/:id" component={ Profile }/>
        <Route path="/login" component={ Login } />
        <Route path="/logout" component={ Logout } />
      </div>
    </BrowserRouter>
  );
}

export default Routes;
