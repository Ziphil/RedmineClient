//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {IssueChart} from "/renderer/component/module/issue-chart";
import {useSuspenseQuery} from "/renderer/hook/request";


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

  const [issueGroups] = useSuspenseQuery("fetchIssues", window.api.fetchHierarchicalIssues, {});

  return (
    <div className={styles.root}>
      <IssueChart issueGroups={issueGroups} dateCount={20}/>
    </div>
  );

};