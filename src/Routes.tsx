import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Root from "./components/layout/Root";
import Header from "./components/layout/Header";
import HomePage from "./pages/public/Home";
import AboutPage from "./pages/public/About";
import NotFoundPage from "./pages/NotFound";

// If your app is big + you have routes with a lot of components, you should consider
// code-splitting your routes! If you bundle stuff up with Webpack, I recommend `react-loadable`.
//
// $ yarn add react-loadable
// $ yarn add --dev @types/react-loadable
//
// The given `pages/` directory provides an example of a directory structure that's easily
// code-splittable.

const Routes: React.SFC = () => (
  <Root>
    <Header title="LIfeQuest" />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Root>
);

export default Routes;
