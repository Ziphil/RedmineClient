//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useCallback} from "react";
import {invalidateQueries} from "/renderer/hook/request";
import {useWork} from "/renderer/hook/work";
import {gradientBackground, textColor} from "/renderer/util/css";
import {WorkController} from "./work-controller";
import {WorkTimer} from "./work-timer";
import {WorkView} from "./work-view";


const styles = {
  root: css`
    height: 176px;
    padding-block: 24px;
    padding-inline: 24px;
    column-gap: 32px;
    border-end-start-radius: 12px;
    border-end-end-radius: 12px;
    color: ${textColor("dark")};
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
}: {
}): ReactElement {

  const [work, setWork] = useWork();

  const handlePunch = useCallback(async function (done: boolean): Promise<void> {
    if (work !== null) {
      const time = ((work.startDate !== null) ? dayjs().diff(work.startDate, "millisecond") : 0) + work.additionalTime;
      await window.api.addSpentTime(work.issue.id, time);
      if (done) {
        await window.api.makeIssueDone(work.issue.id);
      }
      await invalidateQueries("fetchIssues");
      setWork(null);
    }
  }, [work, setWork]);

  const handlePause = useCallback(function (): void {
    if (work !== null) {
      if (work.startDate !== null) {
        const time = dayjs().diff(work.startDate, "millisecond");
        setWork({...work, startDate: null, additionalTime: work.additionalTime + time});
      } else {
        setWork({...work, startDate: dayjs()});
      }
    }
  }, [work, setWork]);

  const handleCancel = useCallback(function (): void {
    setWork(null);
  }, [setWork]);

  return (
    <div className={styles.root}>
      {work !== null && (
        <>
          <WorkView work={work}/>
          <div className={styles.right}>
            <WorkTimer work={work}/>
            <WorkController work={work} onPunch={handlePunch} onPause={handlePause} onCancel={handleCancel}/>
          </div>
        </>
      )}
    </div>
  );

};