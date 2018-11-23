import * as React from "react";

import {Container} from "../../containers/auth/Container";

const Page: React.SFC = ({ children }) => (
  <Container>
    {({initialized, refreshSession}) => {
      if (!initialized) {
        refreshSession();
      }
      return (
        <div className="container">{children}</div>
      );
    }}
  </Container>
);

export default Page;
