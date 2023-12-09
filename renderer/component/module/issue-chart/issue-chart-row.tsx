//

import {faAngleRight} from "@fortawesome/pro-regular-svg-icons";
import {faArrowLeft, faArrowRight} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {IdView} from "/renderer/component/module/id-view";
import {HierarchicalIssue} from "/renderer/type";
import {aria, data} from "/renderer/util/data";


export const IssueChartRow = create(
  require("./issue-chart-row.scss"), "IssueChartRow",
  function ({
    issue,
    level,
    parent,
    businessDates
  }: {
    issue: HierarchicalIssue,
    level: number,
    parent: boolean,
    businessDates: Array<Dayjs>
  }): ReactElement {

    const [startIndex, startOverflown, startBeyond] = calcStartIndex(issue, businessDates);
    const [endIndex, endOverflown, endBeyond] = calcEndIndex(issue, businessDates);
    const late = issue.dueDate !== null && dayjs().isAfter(issue.dueDate, "day");
    const future = issue.startDate !== null && dayjs().isBefore(issue.startDate, "day");
    const now = issue.startDate !== null && issue.dueDate !== null && !late && !future;

    return (
      <TransitionLink styleName="root" to={`/issue/${issue.id}`} style={{gridTemplateColumns: `1fr repeat(${businessDates.length}, 36px)`}}>
        <div styleName="left">
          <span styleName="indent" {...aria({hidden: true})}>
            {Array.from({length: level}).map((dummy, index) => (
              <span key={index} styleName="indent-item">
                <FontAwesomeIcon icon={faAngleRight}/>
              </span>
            ))}
          </span>
          <span styleName="subject-container">
            <IdView id={issue.id}/>
            <span styleName="subject" {...data({late, future, now})}>
              {issue.subject}
            </span>
            {(issue.childIssues.length > 0) && (
              <span styleName="percent">{issue.ratio}%</span>
            )}
          </span>
        </div>
        <div styleName="border">
          {businessDates.map((day, index) => (
            <div
              styleName="border-item"
              key={day.format("YYYY-MM-DD")}
              style={{gridColumnStart: index + 2, gridColumnEnd: index + 2}}
              {...data({today: day.isSame(dayjs(), "day")})}
              {...aria({hidden: true})}
            />
          ))}
        </div>
        {(startIndex !== null && endIndex !== null) && (
          (!startBeyond && !endBeyond) ? (
            <div
              styleName="meter"
              style={{gridColumnStart: startIndex + 2, gridColumnEnd: endIndex + 2}}
              {...data({parent, startOverflown, endOverflown, late, future, now})}
              {...aria({hidden: true})}
            />
          ) : (
            <div
              styleName="arrow"
              {...data({parent, startBeyond, endBeyond})}
              {...aria({hidden: true})}
            >
              <FontAwesomeIcon icon={startBeyond ? faArrowRight : faArrowLeft}/>
            </div>
          )
        )}
      </TransitionLink>
    );

  }
);


function calcStartIndex(issue: HierarchicalIssue, businessDates: Array<Dayjs>): [number | null, boolean, boolean] {
  if (issue.startDate !== null) {
    const rawIndex = businessDates.findIndex((date) => date.isSame(issue.startDate, "day") || date.isAfter(issue.startDate, "day"));
    const index = (rawIndex < 0) ? 0 : rawIndex;
    const overflown = businessDates[0].isAfter(issue.startDate, "day");
    const beyond = businessDates[businessDates.length - 1].isBefore(issue.startDate, "day");
    return [index, overflown, beyond];
  } else {
    return [null, false, false];
  }
}

function calcEndIndex(issue: HierarchicalIssue, businessDates: Array<Dayjs>): [number | null, boolean, boolean] {
  if (issue.dueDate !== null) {
    const rawIndex = businessDates.findIndex((date) => date.isAfter(issue.dueDate, "day"));
    const index = (rawIndex < 0) ? businessDates.length : rawIndex;
    const overflown = businessDates[businessDates.length - 1].isBefore(issue.dueDate, "day");
    const beyond = businessDates[0].isAfter(issue.dueDate, "day");
    return [index, overflown, beyond];
  } else {
    return [null, false, false];
  }
}