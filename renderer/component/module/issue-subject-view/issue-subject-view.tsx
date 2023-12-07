//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {IdView} from "/renderer/component/module/id-view";
import {Issue} from "/renderer/type";
import {data} from "/renderer/util/data";


const styles = {
  root: css`
    flex-grow: 1;
    flex-shrink: 1;
  `,
  complement: css`
    column-gap: 1em;
    font-size: 50%;
    display: flex;
    align-items: center;
    &[data-size="medium"] {
      font-size: 20px;
    }
    &[data-size="large"] {
      font-size: 24px;
    }
  `,
  project: css`
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &[data-size="medium"] {
      margin-block-start: 8px;
      font-size: 20px;
    }
    &[data-size="large"] {
      margin-block-start: 12px;
      font-size: 24px;
    }
  `,
  subject: css`
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &[data-size="medium"] {
      margin-block-start: 6px;
      font-size: 32px;
    }
    &[data-size="large"] {
      margin-block-start: 9px;
      font-size: 48px;
    }
  `
};

export const IssueSubjectView = function ({
  issue,
  size,
  environment = "light"
}: {
  issue: Issue,
  size: "medium" | "large",
  environment?: "light" | "dark"
}): ReactElement {

  return (
    <div className={styles.root}>
      <div className={styles.complement} {...data({size})}>
        <IdView id={issue.id} environment={environment}/>
      </div>
      <div className={styles.project} {...data({size})}>
        {issue.project.name}
      </div>
      <div className={styles.subject} {...data({size})}>
        {issue.subject}
      </div>
    </div>
  );

};