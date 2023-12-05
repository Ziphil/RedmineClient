//

import {css} from "@linaria/core";
import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {Issue} from "/main/type";
import {data} from "/renderer/util/data";


const styles = {
  root: css`
    border-block-end: solid 1px hsla(0, 0%, 0%, 0.07);
    grid-template-columns: 30% repeat(25, 1fr);
    display: grid;
    align-items: center;
    z-index: 0;
    position: relative;
    &::before {
      inset: 0px;
      background-image: linear-gradient(to right bottom, hsl(220, 90%, 96%), hsl(320, 95%, 96%));
      background-attachment: fixed;
      opacity: 0;
      transition: opacity 0.1s ease;
      content: "";
      z-index: -1;
      position: absolute;
    }
    &:hover::before {
      opacity: 1;
    }
  `,
  subjectContainer: css`
    margin-block: 4px;
    display: flex;
    align-items: center;
    grid-column: 1 / 2;
  `,
  id: css`
    width: 32px;
    margin-inline-end: 6px;
    padding-block: 1px;
    font-size: 12px;
    border-radius: 2px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to right bottom, hsl(220, 90%, 90%), hsl(320, 95%, 90%));
    background-attachment: fixed;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  indent: css`
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  indentItem: css`
    width: 12px;
    flex-grow: 0;
    flex-shrink: 0;
  `,
  subject: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  meter: css`
    height: 16px;
    border-radius: 4px;
    background-image: linear-gradient(to right bottom, hsl(220, 90%, 70%), hsl(320, 95%, 70%));
    background-attachment: fixed;
    grid-row: 1;
    &[data-parent] {
      height: 8px;
    }
  `,
  border: css`
    display: contents;
  `,
  borderItem: css`
    border-inline-start: dotted 1px hsla(0, 0%, 0%, 0.05);
    grid-row: 1;
    &:nth-of-type(1) {
      border-inline-start: solid 1px hsla(0, 0%, 0%, 0.05);
    }
    &[data-today] {
      background-image: linear-gradient(to right bottom, hsl(220, 90%, 96%), hsl(320, 95%, 96%));
      background-attachment: fixed;
    }
  `
};

export const IssueRow = function ({
  issue,
  level,
  parent,
  businessDays
}: {
  issue: Issue,
  level: number,
  parent: boolean,
  businessDays: Array<Dayjs>
}): ReactElement {

  const startIndex = calcStartIndex(issue, businessDays);
  const endIndex = calcEndIndex(issue, businessDays);

  return (
    <li className={styles.root}>
      <div className={styles.subjectContainer}>
        <span className={styles.id}>{issue.id}</span>
        <span className={styles.indent}>
          {Array.from({length: level}).map((dummy, index) => (
            <span key={index} className={styles.indentItem}/>
          ))}
        </span>
        <span className={styles.subject}>{issue.subject}</span>
      </div>
      <div className={styles.border}>
        {businessDays.map((day, index) => (
          <div
            className={styles.borderItem}
            key={day.format("YYYY-MM-DD")}
            style={{gridColumnStart: index + 2, gridColumnEnd: index + 2}}
            {...data({today: day.isSame(dayjs(), "day")})}
          />
        ))}
      </div>
      {(startIndex !== null && endIndex !== null) && (
        <div
          className={styles.meter}
          style={{gridColumnStart: startIndex + 2, gridColumnEnd: endIndex + 2}}
          {...data({parent})}
        />
      )}
    </li>
  );

};


function calcStartIndex(issue: Issue, businessDays: Array<Dayjs>): number | null {
  if (issue.startDate !== null) {
    const rawStartIndex = businessDays.findIndex((day) => day.isSame(issue.startDate, "day") || day.isAfter(issue.startDate, "day"));
    const startIndex = (rawStartIndex < 0) ? 0 : rawStartIndex;
    return startIndex;
  } else {
    return null;
  }
}

function calcEndIndex(issue: Issue, businessDays: Array<Dayjs>): number | null {
  if (issue.dueDate !== null) {
    const rawEndIndex = businessDays.findIndex((day) => day.isAfter(issue.dueDate, "day")) - 1;
    const endIndex = (rawEndIndex < 0) ? businessDays.length - 1 : rawEndIndex;
    return endIndex;
  } else {
    return null;
  }
}