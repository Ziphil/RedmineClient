//

import {ReactElement, Suspense} from "react";
import {RouterProvider, createHashRouter} from "react-router-dom";
import {create} from "/renderer/component/create";
import {Header} from "/renderer/component/module/header";
import {WorkPlayer} from "/renderer/component/module/work-player";
import {ChartPage} from "/renderer/component/page/chart-page";
import {IssuePage, loadIssuePage} from "/renderer/component/page/issue-page";


const router = createHashRouter([
  {path: "/chart", element: <ChartPage/>},
  {path: "issue/:id", element: <IssuePage/>, loader: loadIssuePage}
]);


export const Routing = create(
  require("./routing.scss"), "Routing",
  function ({
  }: {
  }): ReactElement | null {

    return (
      <div styleName="root">
        <Header/>
        <main styleName="main">
          <div styleName="player-container">
            <WorkPlayer/>
          </div>
          <div styleName="main-container">
            <Suspense fallback={<div>Loading route</div>}>
              <RouterProvider router={router}/>
            </Suspense>
          </div>
        </main>
      </div>
    );

  }
);