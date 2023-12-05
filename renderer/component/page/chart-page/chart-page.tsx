//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {useSuspenseQuery} from "/renderer/hook/request";
import {IssueChart} from "/renderer/component/module/issue-chart";


const styles = {
  root: css`
    padding-block: 16px;
    padding-inline: 16px;
  `
};

export const ChartPage = function ({
}: {
}): ReactElement {

  const [issueGroups] = useSuspenseQuery("fetchIssues", window.api.fetchIssues, {refetchInterval: 1000 * 60});

  console.log(issueGroups);

  return (
    <div className={styles.root}>
      <IssueChart issueGroups={issueGroups}/>
    </div>
  );

};