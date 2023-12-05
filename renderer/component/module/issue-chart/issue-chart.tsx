//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useMemo} from "react";
import {Issue, IssueGroup} from "/renderer/type";
import {getBusinessDates} from "/renderer/util/date";
import {IssueChartHeader} from "./issue-chart-header";
import {IssueGroupView} from "./issue-group-view";


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

export const IssueChart = function ({
  issueGroups,
  onIssueClick
}: {
  issueGroups: Array<IssueGroup>,
  onIssueClick: (issue: Issue) => unknown
}): ReactElement {

  const businessDates = useMemo(() => getBusinessDates(dayjs().startOf("day"), 2, 22), []);

  return (
    <div className={styles.root}>
      <IssueChartHeader businessDates={businessDates}/>
      <div className={styles.list}>
        {issueGroups.map((issueGroup) => (
          <IssueGroupView key={issueGroup.id} issueGroup={issueGroup} businessDates={businessDates} onIssueClick={onIssueClick}/>
        ))}
      </div>
    </div>
  );

};