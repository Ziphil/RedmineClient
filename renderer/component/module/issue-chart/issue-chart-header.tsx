//

import {faTasks} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {DateView} from "/renderer/component/module/date-view";
import {useToday} from "/renderer/hook/today";
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

    const today = useToday();
    const counts = calcCounts(issueGroups, today);

    return (
      <div styleName="root" style={{gridTemplateColumns: `1fr repeat(${businessDates.length}, 36px)`}}>
        <div styleName="corner">
          <div styleName="count">
            <div styleName="total-count">
              <FontAwesomeIcon styleName="count-icon" icon={faTasks}/>
              <span styleName="count-number">{counts.late + counts.now}</span>
            </div>
            <div styleName="count-table">
              <div styleName="count-item" {...data({type: "now"})}>
                <span styleName="count-label">今日</span>
                <span styleName="count-number">{counts.now}</span>
              </div>
              <div styleName="count-item" {...data({type: "late"})}>
                <span styleName="count-label">遅延</span>
                <span styleName="count-number">{counts.late}</span>
              </div>
            </div>
          </div>
        </div>
        {businessDates.map((date, index) => (
          <div
            styleName="item"
            key={date.format("YYYY-MM-DD")}
            style={{gridColumnStart: index + 2, gridColumnEnd: index + 3}}
            {...data({today: date.isSame(today, "day")})}
          >
            <DateView date={date}/>
          </div>
        ))}
      </div>
    );

  }
);


function calcCounts(issues: Array<HierarchicalIssueGroup | HierarchicalIssue>, today: Dayjs): {late: number, now: number} {
  const counts = {late: 0, now: 0};
  for (const issue of issues) {
    if ("childIssues" in issue) {
      if (issue.childIssues.length > 0) {
        const childCounts = calcCounts(issue.childIssues, today);
        counts.late += childCounts.late;
        counts.now += childCounts.now;
      } else {
        const late = issue.dueDate !== null && today.isAfter(issue.dueDate, "day");
        const future = issue.startDate !== null && today.isBefore(issue.startDate, "day");
        const now = issue.startDate !== null && issue.dueDate !== null && !late && !future;
        counts.late += late ? 1 : 0;
        counts.now += now ? 1 : 0;
      }
    } else {
      const childCounts = calcCounts(issue.issues, today);
      counts.late += childCounts.late;
      counts.now += childCounts.now;
    }
  }
  return counts;
}