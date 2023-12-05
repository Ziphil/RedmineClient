//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useEffect, useState} from "react";
import {Work} from "/renderer/type";


const styles = {
  root: css`
    font-size: 64px;
    font-weight: bold;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  colon: css`
    margin-inline: 0.1em;
    inset-block-end: 0.1em;
    position: relative;
  `
};

export const WorkTimer = function ({
  work
}: {
  work: Work
}): ReactElement {

  const [ellapsedTime, setEllapsedTime] = useState(0);

  const second = ellapsedTime % 60;
  const minute = Math.floor(ellapsedTime / 60) % 60;
  const hour = Math.floor(ellapsedTime / 60 / 60);

  useEffect(() => {
    const timer = setInterval(() => {
      const ellapsedTime = dayjs().diff(work.startDate, "second") + 3907;
      setEllapsedTime(ellapsedTime);
    }, 37);
    return () => {
      clearInterval(timer);
    };
  }, [work.startDate]);

  return (
    <div className={styles.root}>
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
      <span>{(hour === 0 && minute === 0) ? second : second.toString().padStart(2, "0")}</span>
    </div>
  );

};