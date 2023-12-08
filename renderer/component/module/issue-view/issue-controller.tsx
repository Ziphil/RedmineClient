//

import {faBan, faCheck, faPersonRunning} from "@fortawesome/pro-solid-svg-icons";
import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useCallback} from "react";
import {IconButton} from "/renderer/component/atom/icon-button";
import {invalidateQueries} from "/renderer/hook/request";
import {useWork} from "/renderer/hook/work";
import {Issue} from "/renderer/type";


const styles = {
  root: css`
    row-gap: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  row: css`
    column-gap: 12px;
    display: flex;
    flex-direction: row;
  `
};

export const IssueController = function ({
  issue
}: {
  issue: Issue
}): ReactElement {

  const [work, setWork] = useWork();

  const startWork = useCallback(async function (): Promise<void> {
    if (work === null) {
      await window.api.changeIssueStatus({id: issue.id, status: "progress"});
      await invalidateQueries("fetchIssue", (arg) => arg.id === issue.id);
      setWork({issue, startDate: dayjs(), additionalTime: 0});
    }
  }, [issue, work, setWork]);

  const changeIssueStatusToClosed = useCallback(async function (): Promise<void> {
    await window.api.changeIssueStatus({id: issue.id, status: "closed"});
    await invalidateQueries("fetchIssue", (arg) => arg.id === issue.id);
  }, [issue]);

  const changeIssueStatusToRejected = useCallback(async function (): Promise<void> {
    await window.api.changeIssueStatus({id: issue.id, status: "rejected"});
    await invalidateQueries("fetchIssue", (arg) => arg.id === issue.id);
  }, [issue]);

  return (
    <div className={styles.root}>
      <IconButton icon={faPersonRunning} size="large" color="purple" onClick={startWork}/>
      <div className={styles.row}>
        <IconButton icon={faCheck} size="medium" color="blue" onClick={changeIssueStatusToClosed}/>
        <IconButton icon={faBan} size="medium" color="pink" onClick={changeIssueStatusToRejected}/>
      </div>
    </div>
  );

};