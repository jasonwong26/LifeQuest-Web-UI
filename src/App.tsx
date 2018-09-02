import * as React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Store } from "redux";
import { History } from "history";

import Routes from "./Routes";
import { ApplicationState } from "./store/root";

interface PropsFromDispatch {
  [key: string]: any
}
interface OwnProps {
  store: Store<ApplicationState>
  history: History
}
type AllProps = PropsFromDispatch & OwnProps;

class App extends React.Component<AllProps> {
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
