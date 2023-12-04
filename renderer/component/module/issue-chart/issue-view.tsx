//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {Issue} from "/main/type";


const styles = {
  root: css`
    display: contents;
  `,
  subject: css`
    grid-column: 1 / 2;
  `
};

export const IssueView = function ({
  issue
}: {
  issue: Issue
}): ReactElement {

  return (
    <div className={styles.root}>
      <div className={styles.subject}>{issue.subject}</div>
    </div>
  );

};