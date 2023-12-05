//

import {Dayjs} from "dayjs";
import {ReactElement, useMemo} from "react";
import {Issue} from "/renderer/type";
import {compareIssue} from "/renderer/util/issue";
import {IssueRow} from "./issue-row";


const styles = {
};

export const IssueView = function ({
  issue,
  level,
  businessDates,
  onIssueClick
}: {
  issue: Issue,
  level: number,
  businessDates: Array<Dayjs>,
  onIssueClick: (issue: Issue) => unknown
}): ReactElement {

  const sortedChildIssues = useMemo(() => [...issue.childIssues].sort(compareIssue), [issue.childIssues]);

  return (
    <>
      <IssueRow issue={issue} level={level} parent={issue.childIssues.length > 0} businessDates={businessDates} onIssueClick={onIssueClick}/>
      {sortedChildIssues.map((childIssue) => (
        <IssueView key={childIssue.id} issue={childIssue} level={level + 1} businessDates={businessDates} onIssueClick={onIssueClick}/>
      ))}
    </>
  );

};