//

import {css} from "@linaria/core";
import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {Issue} from "/main/type";
import {IssueRow} from "./issue-row";


const styles = {
  root: css`
    display: flex;
    flex-direction: column;
  `,
  list: css`
    display: flex;
    flex-direction: column;
  `
};

export const IssueView = function ({
  issue,
  level,
  businessDays
}: {
  issue: Issue,
  level: number,
  businessDays: Array<Dayjs>
}): ReactElement {

  return (
    <>
      <IssueRow issue={issue} level={level} businessDays={businessDays}/>
      {issue.childIssues.map((childIssue) => (
        <IssueView key={childIssue.id} issue={childIssue} level={level + 1} businessDays={businessDays}/>
      ))}
    </>
  );

};