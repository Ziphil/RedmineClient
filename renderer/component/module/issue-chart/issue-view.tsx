//

import {css} from "@linaria/core";
import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {Issue} from "/main/type";


const styles = {
  root: css`
    border-block-start: solid 1px hsla(0, 0%, 0%, 0.07);
    display: grid;
    grid-template-columns: 30% repeat(30, 1fr);
    z-index: 0;
    position: relative;
    &::before {
      inset: 0px;
      background-image: linear-gradient(to right bottom, hsl(220, 90%, 97%), hsl(320, 95%, 97%));
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
    column-gap: 6px;
    display: flex;
    align-items: center;
    grid-column: 1 / 2;
  `,
  id: css`
    width: 32px;
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
  subject: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
    flex-shrink: 1;
  `,
  meter: css`
    margin-block: 4px;
    border-radius: 4px;
    background-image: linear-gradient(to right bottom, hsl(220, 90%, 70%), hsl(320, 95%, 70%));
    background-attachment: fixed;
    grid-row: 1;
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
  `
};

export const IssueView = function ({
  issue,
  businessDays
}: {
  issue: Issue,
  businessDays: Array<Dayjs>
}): ReactElement {

  const startIndex = calcStartIndex(issue, businessDays);
  const endIndex = calcEndIndex(issue, businessDays);

  return (
    <div className={styles.root}>
      <div className={styles.subjectContainer}>
        <span className={styles.id}>{issue.id}</span>
        <span className={styles.subject}>{issue.subject}</span>
      </div>
      <div className={styles.border}>
        {businessDays.map((day, index) => (
          <div className={styles.borderItem} key={day.format("YYYY-MM-DD")} style={{gridColumnStart: index + 2, gridColumnEnd: index + 2}}/>
        ))}
      </div>
      {(startIndex !== null && endIndex !== null) && (
        <div className={styles.meter} style={{gridColumnStart: startIndex + 2, gridColumnEnd: endIndex + 2}}/>
      )}
    </div>
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