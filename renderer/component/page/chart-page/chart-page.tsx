//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useState} from "react";
import {IssueChart} from "/renderer/component/module/issue-chart";
import {WorkPlayer} from "/renderer/component/module/work-player";
import {useSuspenseQuery} from "/renderer/hook/request";
import {Work} from "/renderer/type";


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
  const [work, setWork] = useState<Work | null>({issue: issueGroups[0].issues[0], startDate: dayjs()});

  return (
    <div className={styles.root}>
      <WorkPlayer work={work}/>
      <div className={styles.chartContainer}>
        <IssueChart issueGroups={issueGroups}/>
      </div>
    </div>
  );

};