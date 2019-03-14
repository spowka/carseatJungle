import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import App from './App';
import * as axios from 'axios';
import reducer from './reducers/index.js';
import {getCarseatTypes} from './data/carseatType/CarseatTypeActions.js';
import './polyfills';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, logger)),
);

// set base url for API calls
if (process.env.REACT_APP_API_HOST)
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;
else
  axios.defaults.baseURL =
    'http://InitCarseatjungleApi-env.dq8igxkye2.us-east-2.elasticbeanstalk.com';

// set the message that will be dispatched to reducers for ajax errors
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response !== undefined && error.response.status === 401) {
      store.dispatch({type: 'UNAUTHORIZED', payload: error});
    }

    return Promise.reject(error);
  },
);

store.dispatch(getCarseatTypes());

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

store.subscribe(render);
render();
