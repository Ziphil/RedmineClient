//

import {css} from "@linaria/core";
import {Dayjs} from "dayjs";
import {ReactElement, useMemo} from "react";
import {create} from "/renderer/component/create";
import {HierarchicalIssueGroup} from "/renderer/type";
import {borderColor} from "/renderer/util/css";
import {compareIssue} from "/renderer/util/issue";
import {IssueChartIssue} from "./issue-chart-issue";


const styles = {
  root: css`
    margin-block-start: 12px;
    display: flex;
    flex-direction: column;
  `,
  name: css`
    padding-block: 4px; 
    font-size: 12px;
    font-weight: bold;
    border-block-end: solid 1px ${borderColor()};
  `,
  list: css`
    display: flex;
    flex-direction: column;
  `
};

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