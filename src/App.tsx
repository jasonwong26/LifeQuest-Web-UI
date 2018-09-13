import * as React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Store } from "redux";
import { History } from "history";

import Routes from "./Routes";
import { ApplicationState } from "./store/root";

interface Props {
  store: Store<ApplicationState>
  history: History
}

class App extends React.Component<Props> {
  public render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
