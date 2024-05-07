//

import {Dayjs} from "dayjs";
import {ReactElement, useMemo} from "react";
import {create} from "/renderer/component/create";
import {useResponse} from "/renderer/hook/request";
import {HierarchicalIssue} from "/renderer/type";
import {compareIssue} from "/renderer/util/issue";
import {IssueChartRow} from "./issue-chart-row";


export const IssueChartItem = create(
  require("./issue-chart-item.scss"), "IssueChartItem",
  function ({
    issue,
    level,
    businessDates
  }: {
    issue: HierarchicalIssue,
    level: number,
    businessDates: Array<Dayjs>
  }): ReactElement {

    const hasMyChildren = issue.childIssues.length > 0;
    const [hasOtherChildren] = useResponse("fetchIssueHasChildren", window.api.fetchIssueHasChildren, !hasMyChildren && {id: issue.id});
    const hasChildren = hasMyChildren || (hasOtherChildren ?? false);

    const sortedChildIssues = useMemo(() => [...issue.childIssues].sort(compareIssue), [issue.childIssues]);

    return (
      <>
        <IssueChartRow issue={issue} level={level} parent={hasChildren} businessDates={businessDates}/>
        {sortedChildIssues.map((childIssue) => (
          <IssueChartItem key={childIssue.id} issue={childIssue} level={level + 1} businessDates={businessDates}/>
        ))}
      </>
    );

  }
);