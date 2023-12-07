//

import {ReactElement} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import {ChartPage} from "/renderer/component/page/chart-page";


export const Routing = function ({
}: {
}): ReactElement | null {

  return (
    <HashRouter>
      <Routes>
        <Route
          path="chart"
          element={<ChartPage/>}
        />
      </Routes>
    </HashRouter>
  );

};