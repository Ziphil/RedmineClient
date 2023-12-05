//

import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {Issue} from "/main/type";
import {IssueRow} from "./issue-row";


const styles = {
};

export const IssueView = function ({
  issue,
  level,
  businessDates
}: {
  issue: Issue,
  level: number,
  businessDates: Array<Dayjs>
}): ReactElement {

  return (
    <>
      <IssueRow issue={issue} level={level} parent={issue.childIssues.length > 0} businessDates={businessDates}/>
      {issue.childIssues.map((childIssue) => (
        <IssueView key={childIssue.id} issue={childIssue} level={level + 1} businessDates={businessDates}/>
      ))}
    </>
  );

};