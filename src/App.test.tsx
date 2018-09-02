import * as React from "react";
import * as ReactDOM from "react-dom";
import { createHashHistory } from "history";
import { configureStore } from "./store/configure";
import App from "./App";

it("renders without crashing", () => {
  const history = createHashHistory();
  const store = configureStore(history);
  const div = document.createElement("div");

  ReactDOM.render(<App store={store} history={history} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
