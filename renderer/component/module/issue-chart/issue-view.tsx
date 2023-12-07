//

import {Dayjs} from "dayjs";
import {ReactElement, useMemo} from "react";
import {HierarchicalIssue} from "/renderer/type";
import {compareIssue} from "/renderer/util/issue";
import {IssueRow} from "./issue-row";


const styles = {
};

export const IssueView = function ({
  issue,
  level,
  businessDates
}: {
  issue: HierarchicalIssue,
  level: number,
  businessDates: Array<Dayjs>
}): ReactElement {

  const sortedChildIssues = useMemo(() => [...issue.childIssues].sort(compareIssue), [issue.childIssues]);

  return (
    <>
      <IssueRow issue={issue} level={level} parent={issue.childIssues.length > 0} businessDates={businessDates}/>
      {sortedChildIssues.map((childIssue) => (
        <IssueView key={childIssue.id} issue={childIssue} level={level + 1} businessDates={businessDates}/>
      ))}
    </>
  );

};