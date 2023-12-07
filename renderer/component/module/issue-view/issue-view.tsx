//

import {css} from "@linaria/core";
import {ReactElement} from "react";
import SimpleBar from "simplebar-react";
import {Markdown} from "/renderer/component/atom/markdown";
import {IssueSubjectView} from "/renderer/component/module/issue-subject-view";
import {Issue} from "/renderer/type";
import {borderColor} from "/renderer/util/css";
import {IssueController} from "./issue-controller";


const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  top: css`
    padding-block-end: 24px;
    border-block-end: 1px solid ${borderColor()};
    display: flex;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  subject: css`
    font-size: 28px;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  scroll: css`
    flex-grow: 1;
    flex-shrink: 1;
  `,
  article: css`
    padding-block-start: 24px;
    padding-block-end: 24px;
  `
};

export const IssueView = function ({
  issue
}: {
  issue: Issue
}): ReactElement {

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.subject}>
          <IssueSubjectView issue={issue} size="medium"/>
        </div>
        <IssueController issue={issue}/>
      </div>
      <SimpleBar className={styles.scroll}>
        <article className={styles.article}>
          <Markdown>
            {issue.description}
          </Markdown>
        </article>
      </SimpleBar>
    </div>
  );

};