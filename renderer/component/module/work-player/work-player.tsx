//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {Work} from "/renderer/type";
import {gradientBackground} from "/renderer/util/css";
import {WorkController} from "./work-controller";
import {WorkTimer} from "./work-timer";
import {WorkView} from "./work-view";


const styles = {
  root: css`
    height: 208px;
    padding-block: 24px;
    padding-inline: 32px;
    column-gap: 32px;
    border-end-start-radius: 16px;
    border-end-end-radius: 16px;
    color: white;
    ${gradientBackground(0.5)}
    display: flex;
    align-items: center;
  `,
  right: css`
    column-gap: 32px;
    display: flex;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
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
          <div className={styles.right}>
            <WorkTimer work={work}/>
            <WorkController work={work}/>
          </div>
        </>
      )}
    </div>
  );

};