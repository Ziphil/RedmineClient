//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {useSuspenseQuery} from "/renderer/hook/request";
import {IssueChart} from "/renderer/component/module/issue-chart";


const styles = {
  root: css`
  `
};

export const ChartPage = function ({
}: {
}): ReactElement {

  const [issues] = useSuspenseQuery("fetchIssues", window.api.fetchIssues, {});

  return (
    <div className={styles.root}>
      <IssueChart issues={issues}/>
    </div>
  );

};