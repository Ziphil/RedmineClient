//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useEffect, useState} from "react";
import {Work} from "/renderer/type";


const styles = {
  root: css`
    width: 256px;
    font-size: 64px;
    font-weight: bold;
    text-align: end;
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

  const second = Math.floor(ellapsedTime / 1000) % 60;
  const minute = Math.floor(ellapsedTime / 1000 / 60) % 60;
  const hour = Math.floor(ellapsedTime / 1000 / 60 / 60);

  useEffect(() => {
    const timer = setInterval(() => {
      const ellapsedTime = ((work.startDate !== null) ? dayjs().diff(work.startDate, "millisecond") : 0) + work.additionalTime;
      setEllapsedTime(ellapsedTime);
    }, 23);
    return () => {
      clearInterval(timer);
    };
  }, [work.startDate, work.additionalTime]);

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