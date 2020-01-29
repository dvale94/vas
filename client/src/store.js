import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState,
  composeWithDevTools(
    applyMiddleware(...middleware),
    //window.navigator.userAgent.includes('Chrome') ?
      //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose
  )
);

// const store = createStore( rootReducer, initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default store;