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
  {path: "issue/:idString", element: <IssuePage/>, loader: loadIssuePage}
]);


export const Routing = create(
  require("./routing.scss"), "Routing",
  function ({
  }: {
  }): ReactElement | null {

    return (
      <div styleName="root">
        <div styleName="top">
          <Header/>
          <WorkPlayer/>
        </div>
        <main styleName="main">
          <Suspense fallback={<div>Loading route</div>}>
            <RouterProvider router={router}/>
          </Suspense>
        </main>
      </div>
    );

  }
);