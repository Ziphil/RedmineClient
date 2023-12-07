//

import {faPause, faPlay, faStop, faXmark} from "@fortawesome/pro-solid-svg-icons";
import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useCallback} from "react";
import {IconButton} from "/renderer/component/atom/icon-button";
import {invalidateQueries} from "/renderer/hook/request";
import {useWork} from "/renderer/hook/work";
import {Work} from "/renderer/type";


const styles = {
  root: css`
    column-gap: 8px;
    display: flex;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  row: css`
    row-gap: 12px;
    display: flex;
    flex-direction: column;
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
      <IconButton icon={faStop} size="large" environment="dark" onClick={punch}/>
      <div className={styles.row}>
        <IconButton icon={(work?.startDate !== null) ? faPlay : faPause} size="medium" environment="dark" onClick={pause}/>
        <IconButton icon={faXmark} size="medium" environment="dark" onClick={cancel}/>
      </div>
    </div>
  );

};