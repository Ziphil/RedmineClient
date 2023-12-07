//

import {css} from "@linaria/core";
import dayjs from "dayjs";
import {ReactElement, useMemo} from "react";
import SimpleBar from "simplebar-react";
import {HierarchicalIssueGroup} from "/renderer/type";
import {getBusinessDates} from "/renderer/util/date";
import {IssueChartHeader} from "./issue-chart-header";
import {IssueChartIssueGroup} from "./issue-chart-issue-group";


const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  outer: css`
    margin-inline: -2px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    :global(.simplebar-track) {
      opacity: 0;
    }
  `,
  list: css`
    margin-inline: 2px;
    padding-block-end: 24px;
    display: flex;
    flex-direction: column;
  `
};

export const IssueChart = function ({
  issueGroups,
  dateCount
}: {
  issueGroups: Array<HierarchicalIssueGroup>,
  dateCount: number
}): ReactElement {

  const businessDates = useMemo(() => getBusinessDates(dayjs().startOf("day"), 2, dateCount - 3), [dateCount]);
  const sortedIssueGroups = useMemo(() => [...issueGroups].sort((first, second) => second.id - first.id), [issueGroups]);

  return (
    <div className={styles.root}>
      <IssueChartHeader businessDates={businessDates}/>
      <SimpleBar className={styles.outer}>
        <div className={styles.list}>
          {sortedIssueGroups.map((issueGroup) => (
            <IssueChartIssueGroup key={issueGroup.id} issueGroup={issueGroup} businessDates={businessDates}/>
          ))}
        </div>
      </SimpleBar>
    </div>
  );

};