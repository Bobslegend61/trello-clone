import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middlewares = [logger, thunk];

export default createStore(rootReducer, applyMiddleware(...middlewares));
