import * as React from "react";
import Page from "../../components/layout/Page";
import LoadingBar from "../../components/layout/LoadingBar";
import {SideBarLayout} from "../../components/layout/SideBarLayout";
import {CutscenesModal} from "./components/cutscenes/CutsceneModal";

import * as Store from "../../store/demo";

import AppContainer from "./Containers/AppContainer";

interface Props {
  appPage: Store.AppPages,
  children: React.ReactNode
}

export const DemoPage: React.SFC<Props> = ({appPage, children}) => (
  <Page>
    <AppContainer>
    {({ loading, app, activeScene, finishCutscene }) => {

      const onModalClose = () => {
        if(!activeScene) return;
        finishCutscene(activeScene);
      };

      const isPageEnabled = !!(app.activePages & appPage); // tslint:disable-line: no-bitwise

      return (
        <SideBarLayout rootUrl="/demo" activePages={app.activePages}>
          {loading && (
            <LoadingBar loading={loading} />
          )}

          {isPageEnabled && (
            children
          )}

          {activeScene && (
            <CutscenesModal scene={activeScene} onClose={onModalClose} />
          )}
        </SideBarLayout>
      );}}
    </AppContainer>
  </Page>
);
