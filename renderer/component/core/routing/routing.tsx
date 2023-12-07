//

import {css} from "@linaria/core";
import {ReactElement, Suspense} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Header} from "/renderer/component/module/header";
import {WorkPlayer} from "/renderer/component/module/work-player";
import {ChartPage} from "/renderer/component/page/chart-page";


const styles = {
  root: css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  main: css`
    row-gap: 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  playerContainer: css`
    flex-grow: 0;
    flex-shrink: 0;
  `,
  mainContainer: css`
    padding-inline: 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
  `
};


export const Routing = function ({
}: {
}): ReactElement | null {

  return (
    <HashRouter>
      <div className={styles.root}>
        <Header/>
        <main className={styles.main}>
          <div className={styles.playerContainer}>
            <WorkPlayer/>
          </div>
          <div className={styles.mainContainer}>
            <Suspense fallback={<div/>}>
              <Routes>
                <Route
                  path="chart"
                  element={<ChartPage/>}
                />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </HashRouter>
  );

};