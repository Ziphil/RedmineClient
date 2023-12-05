//

import {css} from "@linaria/core";
import {ReactElement, useState} from "react";
import {IssueChart} from "/renderer/component/module/issue-chart";
import {IssuePlayer} from "/renderer/component/module/issue-player";
import {useSuspenseQuery} from "/renderer/hook/request";
import {Issue} from "/renderer/type";


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
  const [issue, setIssue] = useState<Issue | null>(issueGroups[0].issues[0]);

  return (
    <div className={styles.root}>
      <IssuePlayer issue={issue}/>
      <div className={styles.chartContainer}>
        <IssueChart issueGroups={issueGroups}/>
      </div>
    </div>
  );

};