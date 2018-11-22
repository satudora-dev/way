import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import registerServiceWorker from './utils/registerServiceWorker';

import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers';
import reduxThunk from "redux-thunk";

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));


ReactDOM.render(
  <div>
    <Routes store={store}/>
  </div>,
  document.getElementById('root'));
registerServiceWorker();
