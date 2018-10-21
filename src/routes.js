import React , { Component }from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import App from './containers/App';
import Login from './containers/Login';
import Signup from './containers/Signup';
import User from './containers/User';
import Profile from './containers/Profile';
import Logout from './containers/Logout';

import * as actions from './actions'
import { Provider, connect } from 'react-redux';
const Routes = ( {store, loadAccounts, loadPositions, loadProjects, loadTags, loadUsers} ) => {
  console.log(store)
  loadAccounts();
  loadPositions();
  loadProjects();
  loadTags();
  loadUsers();

  return(
    <Provider store={store}>
      <BrowserRouter >
        <div>
          <Route exact path="/" component={ App } />
          <Route path="/signup" component={ Signup } />
          <Route exact path="/users" component={ User } />
          <Route path="/users/:id" component={Profile}/>
          <Route path="/login" component={ Login } />
          <Route path="/logout" component={ Logout } />
          <button onClick={() => console.log(store.getState())}>tetetete</button>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default connect(null,actions)(Routes);
