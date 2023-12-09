//

import {faTasks} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {DateView} from "/renderer/component/module/date-view";
import {HierarchicalIssue, HierarchicalIssueGroup} from "/renderer/type";
import {data} from "/renderer/util/data";


export const IssueChartHeader = create(
  require("./issue-chart-header.scss"), "IssueChartHeader",
  function ({
    issueGroups,
    businessDates
  }: {
    issueGroups: Array<HierarchicalIssueGroup>,
    businessDates: Array<Dayjs>
  }): ReactElement {

    const counts = calcCounts(issueGroups);

    return (
      <div styleName="root" style={{gridTemplateColumns: `1fr repeat(${businessDates.length}, 36px)`}}>
        <div styleName="count">
          <div styleName="total-count">
            <FontAwesomeIcon styleName="count-icon" icon={faTasks}/>
            {counts.late + counts.now}
          </div>
          <div styleName="count-table">
            <div styleName="count-item" {...data({type: "now"})}>
              <span styleName="count-label">今日</span>
              <span>{counts.now}</span>
            </div>
            <div styleName="count-item" {...data({type: "late"})}>
              <span styleName="count-label">遅延</span>
              <span>{counts.late}</span>
            </div>
          </div>
        </div>
        {businessDates.map((date, index) => (
          <div
            styleName="item"
            key={date.format("YYYY-MM-DD")}
            style={{gridColumnStart: index + 2, gridColumnEnd: index + 3}}
            {...data({today: date.isSame(dayjs(), "day")})}
          >
            <DateView date={date}/>
          </div>
        ))}
      </div>
    );

  }
);


function calcCounts(issues: Array<HierarchicalIssueGroup | HierarchicalIssue>): {late: number, now: number} {
  const counts = {late: 0, now: 0};
  for (const issue of issues) {
    if ("childIssues" in issue) {
      if (issue.childIssues.length > 0) {
        const childCounts = calcCounts(issue.childIssues);
        counts.late += childCounts.late;
        counts.now += childCounts.now;
      } else {
        const late = issue.dueDate !== null && dayjs().isAfter(issue.dueDate, "day");
        const future = issue.startDate !== null && dayjs().isBefore(issue.startDate, "day");
        const now = issue.startDate !== null && issue.dueDate !== null && !late && !future;
        counts.late += late ? 1 : 0;
        counts.now += now ? 1 : 0;
      }
    } else {
      const childCounts = calcCounts(issue.issues);
      counts.late += childCounts.late;
      counts.now += childCounts.now;
    }
  }
  return counts;
}