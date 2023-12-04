//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {Issue} from "/main/type";
import {IssueView} from "./issue-view";


const styles = {
  root: css`
    display: grid;
    grid-template-columns: 30% repeat(30, 1fr);
  `
};

export const IssueChart = function ({
  issues
}: {
  issues: Array<Issue>
}): ReactElement {

  return (
    <ul className={styles.root}>
      {issues.map((issue) => (
        <IssueView key={issue.id} issue={issue}/>
      ))}
    </ul>
  );

};