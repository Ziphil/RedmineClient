//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useEffect, useState} from "react";
import {TimeView} from "/renderer/component/module/time-view";
import {Work} from "/renderer/type";


const styles = {
  root: css`
    row-gap: 8px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  ellapsed: css`
    font-size: 72px;
  `
};

export const WorkTimer = function ({
  work
}: {
  work: Work
}): ReactElement {

  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = ((work.startDate !== null) ? dayjs().diff(work.startDate, "millisecond") : 0) + work.additionalTime;
      setTime(time);
    }, 23);
    return () => clearInterval(interval);
  }, [work.startDate, work.additionalTime]);

  return (
    <div className={styles.root}>
      <div className={styles.ellapsed}>
        <TimeView time={time}/>
      </div>
    </div>
  );

};