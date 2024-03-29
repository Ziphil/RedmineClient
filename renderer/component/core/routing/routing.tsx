//

import {ReactElement, Suspense} from "react";
import {RouterProvider, createHashRouter} from "react-router-dom";
import {create} from "/renderer/component/create";
import {ChartPage} from "/renderer/component/page/chart-page";
import {IssuePage} from "/renderer/component/page/issue-page";
import {useAutoUpdateToday} from "/renderer/hook/today";


const router = createHashRouter([
  {path: "/chart", element: <ChartPage/>},
  {path: "issue/:idString", element: <IssuePage/>}
]);


export const Routing = create(
  require("./routing.scss"), "Routing",
  function ({
  }: {
  }): ReactElement | null {

    useAutoUpdateToday();

    return (
      <Suspense fallback={<div/>}>
        <RouterProvider router={router}/>
      </Suspense>
    );

  }
);