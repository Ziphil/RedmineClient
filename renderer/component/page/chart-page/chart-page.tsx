//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {useSuspenseQuery} from "/renderer/hook/request";
import {IssueChart} from "/renderer/component/module/issue-chart";


const styles = {
  root: css`
    margin-block: 8px;
    margin-inline: 8px;
  `
};

export const ChartPage = function ({
}: {
}): ReactElement {

  const [projects] = useSuspenseQuery("fetchIssues", window.api.fetchIssues, {});

  console.log(projects);

  return (
    <div className={styles.root}>
      <IssueChart projects={projects}/>
    </div>
  );

};