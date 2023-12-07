//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useCallback, useState} from "react";
import {IssueChart} from "/renderer/component/module/issue-chart";
import {useSuspenseQuery} from "/renderer/hook/request";
import {Issue, Work} from "/renderer/type";


const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
  `
};

export const ChartPage = function ({
}: {
}): ReactElement {

  const [issueGroups] = useSuspenseQuery("fetchIssues", window.api.fetchIssues, {});
  const [work, setWork] = useState<Work | null>(null);

  const handleIssueClick = useCallback(function (issue: Issue): void {
    if (work === null) {
      const work = {issue, startDate: dayjs(), additionalTime: 0};
      setWork(work);
    }
  }, [work]);

  return (
    <div className={styles.root}>
      <IssueChart issueGroups={issueGroups} rowCount={20} onIssueClick={handleIssueClick}/>
    </div>
  );

};