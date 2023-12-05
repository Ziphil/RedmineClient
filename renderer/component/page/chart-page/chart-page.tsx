//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useCallback, useState} from "react";
import {IssueChart} from "/renderer/component/module/issue-chart";
import {WorkPlayer} from "/renderer/component/module/work-player";
import {invalidateQueries, useSuspenseQuery} from "/renderer/hook/request";
import {Issue, Work} from "/renderer/type";


const styles = {
  root: css`
    width: 100%;
    height: 100%;
  `,
  chartContainer: css`
    padding-block-start: 32px;
    padding-block-end: 32px;
    padding-inline: 24px;
  `
};

export const ChartPage = function ({
}: {
}): ReactElement {

  const [issueGroups] = useSuspenseQuery("fetchIssues", window.api.fetchIssues, {refetchInterval: 1000 * 60});
  const [work, setWork] = useState<Work | null>(null);

  const handleIssueClick = useCallback(function (issue: Issue): void {
    if (work === null) {
      const work = {issue, startDate: dayjs(), additionalTime: 0};
      setWork(work);
    }
  }, [work]);

  const handlePunch = useCallback(async function (done: boolean): Promise<void> {
    if (work !== null) {
      const time = dayjs().diff(work.startDate, "millisecond");
      await window.api.addSpentTime(work.issue.id, time);
      if (done) {
        await window.api.makeIssueDone(work.issue.id);
      }
      await invalidateQueries("fetchIssues");
      setWork(null);
    }
  }, [work]);

  const handlePause = useCallback(function (): void {
    if (work !== null) {
      if (work.startDate !== null) {
        const time = dayjs().diff(work.startDate, "millisecond");
        setWork({...work, startDate: null, additionalTime: work.additionalTime + time});
      } else {
        setWork({...work, startDate: dayjs()});
      }
    }
  }, [work]);

  const handleCancel = useCallback(function (): void {
    setWork(null);
  }, []);

  return (
    <div className={styles.root}>
      <WorkPlayer work={work} onPunch={handlePunch} onPause={handlePause} onCancel={handleCancel}/>
      <div className={styles.chartContainer}>
        <IssueChart issueGroups={issueGroups} onIssueClick={handleIssueClick}/>
      </div>
    </div>
  );

};