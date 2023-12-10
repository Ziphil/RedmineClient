//

import {Dayjs} from "dayjs";
import {ReactElement, useMemo} from "react";
import {SingleLineText} from "/renderer/component/atom/single-line-text";
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
        <SingleLineText tag="h2" styleName="name">
          {issueGroup.name}
        </SingleLineText>
        <div styleName="list">
          {sortedIssues.map((issue) => (
            <IssueChartIssue key={issue.id} issue={issue} level={0} businessDates={businessDates}/>
          ))}
        </div>
      </section>
    );

  }
);