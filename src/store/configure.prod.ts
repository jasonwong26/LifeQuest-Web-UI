import { Store, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";

import { ApplicationState, rootReducer, rootSaga, initialState } from "./root";

export default function configureStore(history: History): Store<ApplicationState> {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
