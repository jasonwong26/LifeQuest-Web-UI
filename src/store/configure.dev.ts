import { Store, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import { History } from "history";

// TODO: add redux-immutable-state-invariant to project
// import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import { ApplicationState, rootReducer, rootSaga, initialState } from "./root";

export default function configureStore(history: History): Store<ApplicationState> {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
