//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {useWork} from "/renderer/hook/work";
import {WorkController} from "./work-controller";
import {WorkTimer} from "./work-timer";
import {WorkView} from "./work-view";


export const WorkPlayer = create(
  require("./work-player.scss"), "WorkPlayer",
  function ({
  }: {
  }): ReactElement {

    const [work] = useWork();

    return (
      <div styleName="root">
        <div styleName="left">
          {work !== null && (
            <WorkView work={work}/>
          )}
        </div>
        <div styleName="right">
          {work !== null && (
            <>
              <WorkTimer work={work}/>
              <WorkController work={work}/>
            </>
          )}
        </div>
      </div>
    );

  }
);