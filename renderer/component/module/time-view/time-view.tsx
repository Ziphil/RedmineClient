//

import {css} from "@linaria/core";
import {ReactElement} from "react";


const styles = {
  root: css`
  `,
  colon: css`
    margin-inline: 0.1em;
    inset-block-end: 0.1em;
    position: relative;
  `
};

export const TimeView = function ({
  time
}: {
  time: number
}): ReactElement {

  const second = Math.floor(time / 1000) % 60;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const hour = Math.floor(time / 1000 / 60 / 60);

  return (
    <span className={styles.root}>
      {(hour > 0) && (
        <>
          <span>{hour}</span>
          <span className={styles.colon}>:</span>
        </>
      )}
      {(hour > 0 || minute > 0) && (
        <>
          <span>{(hour === 0) ? minute : minute.toString().padStart(2, "0")}</span>
          <span className={styles.colon}>:</span>
        </>
      )}
      <>
        <span>{(hour === 0 && minute === 0) ? second : second.toString().padStart(2, "0")}</span>
      </>
    </span>
  );

};