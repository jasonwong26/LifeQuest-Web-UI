import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserHistory } from "history";

import "./styles/bootstrap/css/bootstrap-theme-slate.min.css";
import "./styles/styles.css";
import { configureStore } from "./store/configure";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
