//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {WorkTimer} from "/renderer/component/module/work-player/work-timer";
import {Work} from "/renderer/type";
import {gradientBackground} from "/renderer/util/css";
import {WorkView} from "./work-view";


const styles = {
  root: css`
    padding-block: 32px;
    padding-inline: 32px;
    border-end-start-radius: 16px;
    border-end-end-radius: 16px;
    color: white;
    ${gradientBackground(0.5)}
    display: flex;
    align-items: center;
  `
};

export const WorkPlayer = function ({
  work
}: {
  work: Work | null
}): ReactElement {

  return (
    <div className={styles.root}>
      {work !== null && (
        <>
          <WorkView work={work}/>
          <WorkTimer work={work}/>
        </>
      )}
    </div>
  );

};