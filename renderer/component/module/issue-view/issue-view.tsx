//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import {Markdown} from "/renderer/component/atom/markdown";
import {IssueSubjectView} from "/renderer/component/module/issue-subject-view";
import {useWork} from "/renderer/hook/work";
import {Issue} from "/renderer/type";
import {borderColor} from "/renderer/util/css";
import {IssueController} from "./issue-controller";


const styles = {
  root: css`
    flex-grow: 1;
    flex-shrink: 1;
  `,
  top: css`
    margin-block-end: 24px;
    padding-block-end: 24px;
    border-block-end: 1px solid ${borderColor()};
    display: flex;
    align-items: center;
  `,
  subject: css`
    font-size: 28px;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  controller: css`
    row-gap: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  row: css`
    column-gap: 16px;
    display: flex;
  `
};

export const IssueView = function ({
  issue
}: {
  issue: Issue
}): ReactElement {

  const [work, setWork] = useWork();

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.subject}>
          <IssueSubjectView issue={issue} size="medium"/>
        </div>
        <IssueController issue={issue}/>
      </div>
      <article>
        <Markdown>
          {issue.description}
        </Markdown>
      </article>
    </div>
  );

};