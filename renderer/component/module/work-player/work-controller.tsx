//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useCallback} from "react";
import {IconButton} from "/renderer/component/atom/icon-button";
import {invalidateQueries} from "/renderer/hook/request";
import {useWork} from "/renderer/hook/work";
import {Work} from "/renderer/type";


const styles = {
  root: css`
    row-gap: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  row: css`
    column-gap: 16px;
    display: flex;
  `
};

export const WorkController = function ({
  work
}: {
  work: Work
}): ReactElement {

  const [, setWork] = useWork();

  const punch = useCallback(async function (): Promise<void> {
    if (work !== null) {
      const time = ((work.startDate !== null) ? dayjs().diff(work.startDate, "millisecond") : 0) + work.additionalTime;
      await window.api.addSpentTime(work.issue.id, time);
      await Promise.all([
        invalidateQueries("fetchIssues"),
        invalidateQueries("fetchIssue", (arg) => arg.id === work.issue.id)
      ]);
      setWork(null);
    }
  }, [work, setWork]);

  const pause = useCallback(function (): void {
    if (work !== null) {
      if (work.startDate !== null) {
        const time = dayjs().diff(work.startDate, "millisecond");
        setWork({...work, startDate: null, additionalTime: work.additionalTime + time});
      } else {
        setWork({...work, startDate: dayjs()});
      }
    }
  }, [work, setWork]);

  const cancel = useCallback(function (): void {
    setWork(null);
  }, [setWork]);

  return (
    <div className={styles.root}>
      <IconButton icon={"\uF00C"} size="large" environment="dark" onClick={punch}/>
      <div className={styles.row}>
        <IconButton icon={(work?.startDate !== null) ? "\uF04C" : "\uF04B"} size="medium" environment="dark" onClick={pause}/>
        <IconButton icon={"\uF00D"} size="medium" environment="dark" onClick={cancel}/>
      </div>
    </div>
  );

};