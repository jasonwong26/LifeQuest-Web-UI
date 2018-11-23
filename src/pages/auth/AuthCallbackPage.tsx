import * as React from "react";

import Page from "../../components/layout/Page";
import {Container} from "../../containers/auth/Container";


export const AuthCallbackPage: React.SFC = () => {
  return (
    <Page>
      <Container
        shouldAuthenticateUser
        redirectAfterLogin="../"
        redirectAfterLogout="../">
        {
          () => {
            return (
              <div>
                <h3>Loading Account Information</h3>
                <p>Please wait...</p>
              </div>
            );
          }
        }
      </Container>
    </Page>
  );
};
