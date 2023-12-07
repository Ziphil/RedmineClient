//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useCallback, useEffect} from "react";
import {IconButton} from "/renderer/component/atom/icon-button";
import {Markdown} from "/renderer/component/atom/markdown";
import {IssueSubjectView} from "/renderer/component/module/issue-subject-view";
import {useWork} from "/renderer/hook/work";
import {Issue} from "/renderer/type";
import {borderColor} from "/renderer/util/css";


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

  const startWork = useCallback(function (): void {
    if (work === null) {
      setWork({issue, startDate: dayjs(), additionalTime: 0});
    }
  }, [issue, work, setWork]);

  useEffect(() => {
    setWork({issue, startDate: dayjs(), additionalTime: 0});
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.subject}>
          <IssueSubjectView issue={issue} size="medium"/>
        </div>
        <div className={styles.controller}>
          <IconButton icon={"\uF70C"} size="large" onClick={startWork}/>
          <div className={styles.row}>
            <IconButton icon={"\uF00C"} size="medium"/>
            <IconButton icon={"\uF05E"} size="medium"/>
          </div>
        </div>
      </div>
      <article>
        <Markdown>
          {issue.description}
        </Markdown>
      </article>
    </div>
  );

};