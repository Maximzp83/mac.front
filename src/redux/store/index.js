import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import browserHistory from 'services/browserHistory';
import rootReducer from '../reducers/index';

const middlewares = [thunk, routerMiddleware(browserHistory)];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancer(applyMiddleware(...middlewares))
);

export default store;
