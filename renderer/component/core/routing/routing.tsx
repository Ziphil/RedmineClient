/* eslint-disable react/jsx-closing-bracket-location */

import {faCircleNotch} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactElement, Suspense} from "react";
import {RouterProvider, createHashRouter} from "react-router-dom";
import {create} from "/renderer/component/create";
import {ActivityPage} from "/renderer/component/page/activity-page";
import {ChartPage} from "/renderer/component/page/chart-page";
import {IssuePage} from "/renderer/component/page/issue-page";
import {ProjectPage} from "/renderer/component/page/project-page";
import {useAutoUpdateToday} from "/renderer/hook/today";


const router = createHashRouter([
  {path: "/chart", element: <ChartPage/>},
  {path: "/project", element: <ProjectPage/>},
  {path: "issue/:idString", element: <IssuePage/>},
  {path: "activity/:date", element: <ActivityPage/>}
]);


export const Routing = create(
  require("./routing.scss"), "Routing",
  function ({
  }: {
  }): ReactElement | null {

    useAutoUpdateToday();

    return (
      <Suspense fallback={(
        <div styleName="loading">
          <FontAwesomeIcon styleName="icon" icon={faCircleNotch} spin={true}/>
        </div>
      )}>
        <RouterProvider router={router}/>
      </Suspense>
    );

  }
);