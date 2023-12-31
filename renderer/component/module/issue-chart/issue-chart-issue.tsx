//

import {Dayjs} from "dayjs";
import {ReactElement, useMemo} from "react";
import {create} from "/renderer/component/create";
import {HierarchicalIssue} from "/renderer/type";
import {compareIssue} from "/renderer/util/issue";
import {IssueChartRow} from "./issue-chart-row";


export const IssueChartIssue = create(
  require("./issue-chart-issue.scss"), "IssueChartIssue",
  function ({
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
        <IssueChartRow issue={issue} level={level} parent={issue.childIssues.length > 0} businessDates={businessDates}/>
        {sortedChildIssues.map((childIssue) => (
          <IssueChartIssue key={childIssue.id} issue={childIssue} level={level + 1} businessDates={businessDates}/>
        ))}
      </>
    );

  }
);