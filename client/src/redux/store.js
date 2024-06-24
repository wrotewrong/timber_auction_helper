import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';

// import reducers
import catalogRedux from './catalogRedux';
import contractsRedux from './contractsRedux';

// combine reducers
const rootReducer = combineReducers({
  catalogRedux,
  contractsRedux,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export default store;
