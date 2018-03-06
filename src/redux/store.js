import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const initialState = {};
const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(combineReducers({ ...reducers }), initialState, composedEnhancers);

export default store;
