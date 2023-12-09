//

import {Dayjs} from "dayjs";
import {ReactElement, useMemo} from "react";
import {create} from "/renderer/component/create";
import {HierarchicalIssueGroup} from "/renderer/type";
import {compareIssue} from "/renderer/util/issue";
import {IssueChartIssue} from "./issue-chart-issue";


export const IssueChartIssueGroup = create(
  require("./issue-chart-issue-group.scss"), "IssueChartIssueGroup",
  function ({
    issueGroup,
    businessDates
  }: {
    issueGroup: HierarchicalIssueGroup,
    businessDates: Array<Dayjs>
  }): ReactElement {

    const sortedIssues = useMemo(() => [...issueGroup.issues].sort(compareIssue), [issueGroup.issues]);

    return (
      <section styleName="root">
        <h2 styleName="name">{issueGroup.name}</h2>
        <div styleName="list">
          {sortedIssues.map((issue) => (
            <IssueChartIssue key={issue.id} issue={issue} level={0} businessDates={businessDates}/>
          ))}
        </div>
      </section>
    );

  }
);